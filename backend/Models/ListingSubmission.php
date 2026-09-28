<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

final class ListingSubmission extends Model
{
    use HasFactory;

    public const PENDING = 'pending';
    public const APPROVED = 'approved';
    public const REJECTED = 'rejected';

    /** @var list<string> */
    protected $fillable = [
        'listing_package_id',
        'listing_mode',
        'maps_url',
        'moderation_status',
        'moderation_notes',
        'expires_at',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['expires_at' => 'immutable_datetime'];
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(ListingPackage::class, 'listing_package_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ListingImage::class)->orderBy('position');
    }

    public function publishedListing(): HasOne
    {
        return $this->hasOne(PropertyListing::class);
    }
}
