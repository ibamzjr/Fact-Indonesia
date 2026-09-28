<?php

declare(strict_types=1);

namespace RoyalVilla\Showcase\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class BrowsePropertiesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, list<mixed>> */
    public function rules(): array
    {
        return [
            'status' => ['nullable', Rule::in(['Dijual', 'Disewa'])],
            'search' => ['nullable', 'string', 'max:120'],
            'place' => ['nullable', 'string', 'max:120'],
            'selected' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'between:6,24'],
        ];
    }

    /** @return array{status: ?string, search: ?string, place: ?string} */
    public function filters(): array
    {
        return [
            'status' => $this->validated('status'),
            'search' => $this->normalized('search'),
            'place' => $this->normalized('place'),
        ];
    }

    private function normalized(string $key): ?string
    {
        $value = $this->validated($key);

        return is_string($value) && trim($value) !== '' ? trim($value) : null;
    }
}

