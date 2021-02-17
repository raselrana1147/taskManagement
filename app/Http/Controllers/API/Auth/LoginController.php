<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
 
    public function login(Request $request){
        $validator=\Validator::make($request->all(),[
            'email'=>'required|string',
            'password'=>'required|string',
          
        ]);
        if ($validator->fails()) {
         return response()->json([
             "success"=>false,
             "message"=>$validator->getMessageBag()->first(),
         ]);
        }else{
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
              
                $user=Auth::user();
                $token = $user->createToken('AuthToken')->accessToken;
                return response()->json([
                    "success"=>true,
                    "message"=>"Successfully Login",
                    'user'=>$user,
                    'token'=>$token
                ]);
            }else{
                return response()->json([
                    "success"=>false,
                    "message"=>"Information Not match",
                ]);
            }
            
        }  

    }

    public function register(Request $request){

        $validator=\Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|string|unique:users',
            'password'=>'required|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success"=>false,
                "message"=>$validator->getMessageBag(),
            ]);
        }else{
            $user=User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);
            if (!is_null($user)) {
                return response()->json([
                    "success"=>true,
                    "message"=>"Registration has been successfully !!!",
                    'user'=>$user,
                ]);
            }else{
                return response()->json([
                    "success"=>false,
                    "message"=>"Something Went wrong"
                ]);
            }
        }

    }
}