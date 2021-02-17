<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    

    public function index(){
      $tasks=Task::all();
        
        return response()->json([
            "success"=>true,
            "message"=>"Task List",
            "data"=>$tasks
        ]);
    }

    public function show($id){
        $task=Task::with('project')->find($id);
          
          return response()->json([
              "success"=>true,
              "message"=>"Task List",
              "data"=>$task
          ]);
      }

      public function store(Request $request){
          
        $formData=$request->all();
        $validator=\Validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'project_id'=>'required'
        ]);
        if ($validator->fails()) {
         return response()->json([
             "success"=>false,
             "message"=>$validator->getMessageBag()->first(),
         ]);
        }else{
            $task=new Task;
            $task->name=$request->name;
            $task->description=$request->description;
            $task->project_id=$request->project_id;
            $task->save();
             return response()->json([
                 "success"=>true,
                 "message"=>"Added new Task",
                 'data'=>$task
             ]);
        }  
      }

      
    public function update(Request $request, $id){

      $task=Task::findOrFail($id);
      $task->status=$request->status;
      $task->save();

      return response()->json([
        "success"=>true,
        "message"=>"Status is updated",
        'data'=>$task
    ]);

       
    }

    public function destroy($id){
        $task=Task::findOrFail($id);
         $task->delete();
            return response()->json([
                "success"=>false,
                "message"=>"Delete Successfully",
            ]);
        
    }


}