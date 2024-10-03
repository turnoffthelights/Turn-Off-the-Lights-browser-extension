//
//  Stefanfunctions.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 25/08/2022.
//

import Cocoa

class Stefanfunctions{    
    func openweb(text:String){
        if let url = URL(string: text), NSWorkspace.shared.open(url) {
            //print("default browser was successfully opened")
        }
    }
}
