<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, list<mixed>> */
    public function rules(): array
    {
        return [
            'package_id' => ['required', 'integer', 'exists:listing_packages,id'],
            'listing_mode' => ['required', Rule::in(['Dijual', 'Disewa'])],
            'maps_url' => ['required', 'url', 'max:500'],
            'property_images' => ['required', 'array', 'size:4'],
            'property_images.*' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
            'agree_terms' => ['accepted'],
        ];
    }
}

