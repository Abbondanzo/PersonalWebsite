<?php

namespace App\Http\Controllers;

use Mail;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MailController extends Controller
{

    public function postMail()
    {
        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required'
        ]);

        $data = array(
            'name' => request('name'),
            'email' => request('email'),
            'msg' => request('message'),
            'ip' => request()->ip(),
            'userAgent' => request()->header('User-Agent')
        );


        Mail::send('contact', $data, function ($message) use ($data) {

            $message->from($data['email'], $data['name']);
            $message->to('peter@abbondanzo.com')->subject('Contact Form');
            // $message->text($data['msg']);

            return ['confirmation' => 'Message sent successfully!'];

        });

    }

}




?>
