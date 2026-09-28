<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class ListingPackage extends Model
{
    /** @var list<string> */
    protected $fillable = ['name', 'price', 'duration_months'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'duration_months' => 'integer',
        ];
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(ListingSubmission::class);
    }
}

