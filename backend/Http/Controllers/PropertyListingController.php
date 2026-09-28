<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use RoyalVilla\Showcase\Http\Requests\BrowsePropertiesRequest;
use RoyalVilla\Showcase\Models\PropertyListing;

final class PropertyListingController
{
    public function index(BrowsePropertiesRequest $request): Response
    {
        $filters = $request->filters();

        $properties = PropertyListing::query()
            ->published()
            ->with('images')
            ->when($filters['status'], fn (Builder $query, string $status) =>
                $query->where('status', $status))
            ->when($filters['place'], fn (Builder $query, string $place) =>
                $query->where('place', 'like', "%{$place}%"))
            ->when($filters['search'], function (Builder $query, string $search): void {
                $query->where(function (Builder $nested) use ($search): void {
                    $nested
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('place', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate($request->integer('per_page', 12))
            ->withQueryString();

        $selected = $request->integer('selected')
            ? PropertyListing::published()->with('images')->find($request->integer('selected'))
            : null;

        return Inertia::render('Layanan/Properti', [
            'properties' => $properties,
            'selectedProperty' => $selected,
            'filters' => $filters,
        ]);
    }

    public function show(PropertyListing $property): Response
    {
        abort_if($property->published_at === null, 404);

        return Inertia::render('Property/Show', [
            'property' => $property->load('images'),
        ]);
    }
}

