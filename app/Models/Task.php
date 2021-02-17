<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class Task extends Model
{
    protected $fillable=['name','description','project_id'];

    public function project(){
        return $this->belongsTo(Project::class);
    }
}