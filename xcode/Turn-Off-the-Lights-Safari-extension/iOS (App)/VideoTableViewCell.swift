//
//  VideoTableViewCell.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 18/06/2021.
//

import UIKit

class BorderImage: UIImageView {
    override func awakeFromNib() {
        self.layoutIfNeeded()
        layer.cornerRadius = 15
        layer.masksToBounds = true
    }
}

class VideoTableViewCell: UITableViewCell {
    @IBOutlet weak var videoImage: UIImageView!
    @IBOutlet weak var videoTitle: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}
