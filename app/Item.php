<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
