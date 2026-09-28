<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Services;

use Illuminate\Support\Facades\DB;
use RoyalVilla\Showcase\Models\ListingSubmission;
use RoyalVilla\Showcase\Models\PropertyListing;

final class ListingModerationService
{
    /**
     * @param array{
     *   decision: 'approve'|'reject',
     *   notes?: ?string,
     *   listing?: array<string, mixed>
     * } $payload
     */
    public function decide(int $submissionId, array $payload): ListingSubmission
    {
        return DB::transaction(function () use ($submissionId, $payload): ListingSubmission {
            $submission = ListingSubmission::query()
                ->with('package')
                ->lockForUpdate()
                ->findOrFail($submissionId);

            if ($submission->moderation_status !== ListingSubmission::PENDING) {
                throw new \DomainException('Only pending submissions can be moderated.');
            }

            if ($payload['decision'] === 'reject') {
                $submission->update([
                    'moderation_status' => ListingSubmission::REJECTED,
                    'moderation_notes' => $payload['notes'] ?? null,
                ]);

                return $submission->refresh();
            }

            $listing = $payload['listing'] ?? [];

            PropertyListing::query()->create([
                'listing_submission_id' => $submission->getKey(),
                'title' => $listing['title'],
                'description' => $listing['description'],
                'price' => $listing['price'],
                'place' => $listing['place'],
                'status' => $submission->listing_mode,
                'featured' => (bool) ($listing['featured'] ?? false),
                'land_area' => $listing['land_area'] ?? null,
                'certificate_type' => $listing['certificate_type'] ?? null,
                'maps_url' => $submission->maps_url,
                'published_at' => now(),
            ]);

            $submission->update([
                'moderation_status' => ListingSubmission::APPROVED,
                'moderation_notes' => $payload['notes'] ?? null,
                'expires_at' => now()->addMonths($submission->package->duration_months),
            ]);

            return $submission->refresh();
        });
    }
}

