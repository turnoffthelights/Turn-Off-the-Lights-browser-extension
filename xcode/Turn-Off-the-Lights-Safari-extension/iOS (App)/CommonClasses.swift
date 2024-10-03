//
//  CommonClasses.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 18/06/2021.
//

import Foundation
import UIKit

enum ItemType {
    case header, row
}

struct Item: Hashable {
    let uuid = UUID()
    let type: ItemType
    var title: String
    var image: UIImage?
}

enum Section {
    case main
    case header
}
