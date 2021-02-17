<?php 

namespace App\repositories;
use App\interfaces\CrudInterface;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectRepositories implements CrudInterface{

    public function getAll(){
        $projects=Project::withCount('tasks')->orderBy('id','desc')->get();
        return $projects;
    }
    public function findById($id){
        $project=Project::with('tasks')->find($id);
        return $project;
    }
    public function create(Request $request){
        $project=new Project;
        $project->name=$request->name;
        $project->description=$request->description;
        $project->user_id=1;
        $project->save();
        return $project;
    }
    public function edit(Request $request , $id){
           $project=$this->findById($id);
            $project->name=$request->name;
            $project->description=$request->description;
            $project->status=$request->status;
            $project->save();
            return $project;
       
    }
    public function delete($id){
        $project=$this->findById($id);
        $project->tasks()->delete();
        $project->delete();
        return $project;
    }

}