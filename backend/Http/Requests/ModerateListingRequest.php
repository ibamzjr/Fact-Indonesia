<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class ModerateListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('moderate-listings') ?? false;
    }

    /** @return array<string, list<mixed>> */
    public function rules(): array
    {
        return [
            'decision' => ['required', Rule::in(['approve', 'reject'])],
            'notes' => ['nullable', 'string', 'max:1000'],
            'listing.title' => ['required_if:decision,approve', 'string', 'max:180'],
            'listing.description' => ['required_if:decision,approve', 'string', 'max:5000'],
            'listing.price' => ['required_if:decision,approve', 'numeric', 'min:0'],
            'listing.place' => ['required_if:decision,approve', 'string', 'max:180'],
            'listing.land_area' => ['nullable', 'integer', 'min:1'],
            'listing.certificate_type' => ['nullable', 'string', 'max:80'],
            'listing.featured' => ['sometimes', 'boolean'],
        ];
    }
}

