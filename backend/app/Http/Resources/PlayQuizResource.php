<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlayQuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'collection_id' => $this->collection_id,
            'answers' => PlayAnswerResource::collection($this->answers)
        ];
    }
}
