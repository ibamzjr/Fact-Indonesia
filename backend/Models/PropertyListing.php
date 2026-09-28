<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class PropertyListing extends Model
{
    use HasFactory;

    /** @var list<string> */
    protected $fillable = [
        'listing_submission_id',
        'title',
        'description',
        'price',
        'place',
        'status',
        'featured',
        'land_area',
        'certificate_type',
        'maps_url',
        'published_at',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'featured' => 'boolean',
            'land_area' => 'integer',
            'published_at' => 'immutable_datetime',
        ];
    }

    public function submission(): BelongsTo
    {
        return $this->belongsTo(ListingSubmission::class, 'listing_submission_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ListingImage::class, 'listing_submission_id', 'listing_submission_id')
            ->orderBy('position');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeForSale(Builder $query): Builder
    {
        return $query->where('status', 'Dijual');
    }

    public function scopeForRent(Builder $query): Builder
    {
        return $query->where('status', 'Disewa');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }
}
