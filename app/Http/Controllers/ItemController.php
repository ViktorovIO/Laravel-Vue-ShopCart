<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $item = Item::all();
        return view('items.index', ['item' => $item]);
    }

    public function getList()
    {
        return response()->json(
            [
                'items' => Item::all()
            ]
        );
    }

    public function handler(Request $request)
    {
        $this->validate($request, [
            'user_name' => 'required|max:255',
            'user_phone' => 'required|max:255',
            'user_address' => 'required',
            'user_comment' => 'required|max:255',
            'cartItems' => 'required'
        ]);

        return response()->json(Skill::all());
    }

    public function create(Request $request)
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
