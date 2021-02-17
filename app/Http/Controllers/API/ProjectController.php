<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\repositories\ProjectRepositories;


class ProjectController extends Controller
{
    public $projectrespositories;

    public function __construct(ProjectRepositories $projectrespositories)
    {
        $this->projectrespositories=$projectrespositories;
    }
    
    public function index(){
        $projects=$this->projectrespositories->getAll();
        
        return response()->json([
            "success"=>true,
            "message"=>"Project List",
            "data"=>$projects
        ]);
    }

    public function show($id){
        $project=$this->projectrespositories->findById($id);

        if (is_null($project)) {
            return response()->json([
                "success"=>false,
                "message"=>"Project",
                "data"=>$project
            ]);
        }else{
             return response()->json([
                "success"=>true,
                "message"=>"Project Details",
                "data"=>$project
            ]);
        }  
       
    }

    public function store(Request $request){

        $formData=$request->all();
       $validator=\Validator::make($formData,[
           'name'=>'required',
           'description'=>'required'
       ]);
       if ($validator->fails()) {
        return response()->json([
            "success"=>false,
            "message"=>$validator->getMessageBag()->first(),
        ]);
       }else{
           $project=$this->projectrespositories->create($request);
            return response()->json([
                "success"=>true,
                "message"=>"Adde new Project",
                'data'=>$project
            ]);
       }  
    }

    public function update(Request $request, $id){
      
        $formData=$request->all();
        $validator=\Validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
        ]);
        if ($validator->fails()) {
         return response()->json([
             "success"=>false,
             "message"=>$validator->getMessageBag()->first(), 
         ]);
        }else{
            $project=$this->projectrespositories->edit($request,$id);
             return response()->json([
                 "success"=>true,
                 "message"=>"Project Update",
                 'data'=>$project
             ]);
        }  
    }

    public function search($search){
        $projects=Project::where('name',$search)->get();
        
        return response()->json([
            "success"=>true,
            "message"=>"Task List",
            "data"=>$projects
        ]);
    }
    public function destroy($id){
        $project=$this->projectrespositories->findById($id);
        if (!is_null($project)) {
            $this->projectrespositories->delete($id);
            return response()->json([
                "success"=>true,
                "message"=>"Project deleted",
                'data'=>$project
            ]);
        }else{
            return response()->json([
                "success"=>false,
                "message"=>"Something went wrong",
            ]);
        }
    }




}