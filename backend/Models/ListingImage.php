<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ListingImage extends Model
{
    /** @var list<string> */
    protected $fillable = ['listing_submission_id', 'path', 'position'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['position' => 'integer'];
    }

    public function submission(): BelongsTo
    {
        return $this->belongsTo(ListingSubmission::class);
    }
}

