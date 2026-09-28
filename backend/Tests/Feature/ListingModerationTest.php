<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use RoyalVilla\Showcase\Models\ListingSubmission;
use RoyalVilla\Showcase\Models\PropertyListing;
use RoyalVilla\Showcase\Services\ListingModerationService;
use Tests\TestCase;

final class ListingModerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_rejection_does_not_publish_a_listing(): void
    {
        $submission = ListingSubmission::factory()->pending()->create();

        app(ListingModerationService::class)->decide($submission->getKey(), [
            'decision' => 'reject',
            'notes' => 'Ownership evidence needs clarification.',
        ]);

        self::assertSame(ListingSubmission::REJECTED, $submission->refresh()->moderation_status);
        self::assertSame(0, PropertyListing::query()->count());
    }

    public function test_approval_publishes_exactly_one_listing(): void
    {
        $submission = ListingSubmission::factory()->pending()->create();

        app(ListingModerationService::class)->decide($submission->getKey(), [
            'decision' => 'approve',
            'listing' => [
                'title' => 'Hillside Villa in Batu',
                'description' => 'A quiet villa with a considered mountain outlook.',
                'price' => 2_400_000_000,
                'place' => 'Batu, East Java',
                'land_area' => 420,
                'certificate_type' => 'SHM',
                'featured' => true,
            ],
        ]);

        self::assertSame(ListingSubmission::APPROVED, $submission->refresh()->moderation_status);
        self::assertSame(1, PropertyListing::query()->count());
    }

    public function test_a_completed_review_cannot_be_repeated(): void
    {
        $submission = ListingSubmission::factory()->approved()->create();

        $this->expectException(\DomainException::class);

        app(ListingModerationService::class)->decide($submission->getKey(), [
            'decision' => 'reject',
        ]);
    }
}
