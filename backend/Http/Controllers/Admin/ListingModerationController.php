<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Http\Controllers\Admin;

use Illuminate\Http\RedirectResponse;
use RoyalVilla\Showcase\Http\Requests\ModerateListingRequest;
use RoyalVilla\Showcase\Models\ListingSubmission;
use RoyalVilla\Showcase\Services\ListingModerationService;

final readonly class ListingModerationController
{
    public function __construct(private ListingModerationService $moderation)
    {
    }

    public function __invoke(
        ModerateListingRequest $request,
        ListingSubmission $submission,
    ): RedirectResponse {
        $this->moderation->decide($submission->getKey(), $request->validated());

        return back()->with('status', 'Listing review saved.');
    }
}

