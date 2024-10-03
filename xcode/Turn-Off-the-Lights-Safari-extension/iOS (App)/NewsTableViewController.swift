//
//  NewsTableViewController.swift
//  SimpleRSSReader
//
//  Copyright (c) 2015 AppCoda. All rights reserved.
//

import UIKit
import SafariServices
    
extension String {
    var withoutHtmlTags: String {
    return self.replacingOccurrences(of: "<[^>]+>", with: "", options:
    .regularExpression, range: nil).replacingOccurrences(of: "&[^;]+;", with:
    "", options:.regularExpression, range: nil)
    }
}

class NewsTableViewController: UITableViewController {
  
    @IBOutlet weak var spinningicon: UIActivityIndicatorView!
    func showTutorial(_ which: Int) {
        let thisurlpost = rssItems![which].link
        Stefanfunctions().opensafaripreview(pageurl: thisurlpost)
    }
    
    var gettimenow: String {
        let calendar = Calendar.current
        let time = calendar.dateComponents([.hour,.minute,.second], from: Date())
        //print("\(time.hour!):\(time.minute!):\(time.second!)")
        let currentimenow = "\(time.hour!):\(time.minute!):\(time.second!)"
        return currentimenow
    }

    fileprivate let feedParser = FeedParser()
    fileprivate let feedURL = "https://www.turnoffthelights.com/blog/feed/"
  
    fileprivate var rssItems: [(title: String, description: String, pubDate: String, link: String)]?

    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.estimatedRowHeight = 140
        tableView.rowHeight = UITableView.automaticDimension
        
        tableView.separatorStyle = UITableViewCell.SeparatorStyle.singleLine
        
        // feed with date refresh needed to solve cache problem
        let newfeedurl = feedURL + "?v=" + gettimenow
        feedParser.parseFeed(feedURL: newfeedurl) { [weak self] rssItems in
            self?.rssItems = rssItems

            DispatchQueue.main.async {
                self?.tableView.reloadSections(IndexSet(integer: 0), with: .none)
            }
        }
        setLoadingScreen()
    }
    
    // View which contains the loading text and the spinner
    let loadingView = UIView()

    // Spinner shown during load the TableView
    var spinner = UIActivityIndicatorView()

    // Text shown during load the TableView
    let loadingLabel = UILabel()

    // Set the activity indicator into the main view
    private func setLoadingScreen() {
        // Sets the view which contains the loading text and the spinner
        let width: CGFloat = 120
        let height: CGFloat = 30
        
        loadingView.frame = CGRect(x: 0, y: 0, width: width, height: height)
        self.view.addSubview(loadingView)
        
        // Sets spinner
        spinner = UIActivityIndicatorView(style: .medium)
        spinner.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        spinner.startAnimating()

        // Sets label
        loadingLabel.frame = CGRect(x: 30, y: 0, width: width, height: height)
        loadingLabel.textColor = .gray
        loadingLabel.text = Stefanfunctions().i18string(text: "strnewsloading")

        // Adds text and spinner to the view
        loadingView.addSubview(spinner)
        loadingView.addSubview(loadingLabel)

        loadingView.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor).isActive = true
        loadingView.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor).isActive = true

        let totalView = UIView()
        totalView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(totalView)
        totalView.addSubview(loadingView)
        NSLayoutConstraint.activate([
            totalView.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor),
            totalView.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor),
            totalView.heightAnchor.constraint(equalToConstant: height),
            totalView.widthAnchor.constraint(equalToConstant: width)
        ])
    }

    // Remove the activity indicator from the main view
    private func removeLoadingScreen() {
        // Hides and stops the text and the spinner
        spinner.stopAnimating()
        spinner.isHidden = true
        loadingLabel.isHidden = true
    }

    // MARK: - Table view data source
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
  
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        guard let rssItems = rssItems else {
          return 0
        }
        return rssItems.count
    }
  
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as! NewsTableViewCell

        if let item = rssItems?[indexPath.row] {
            let string = item.description

            let stringdate = String(item.pubDate)//"2015-02-22T20:58:16 +0000"
            let editeddate = stringdate.replacingOccurrences(of: "+0000", with: "")

            (cell.titleLabel.text, cell.descriptionLabel.text, cell.dateLabel.text) = (item.title, string.withoutHtmlTags, editeddate)

            cell.descriptionLabel.numberOfLines = 3
        }
        return cell
    }

    // MARK: - Table view delegate
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        showTutorial(indexPath.row)
    }

    // animation effect add moving item on scroll
    override func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        self.removeLoadingScreen()
        
        if let lastIndexPath = tableView.indexPathsForVisibleRows?.last{
            if lastIndexPath.row <= indexPath.row{
                cell.center.y = cell.center.y + cell.frame.height / 2
                cell.alpha = 0
                UIView.animate(withDuration: 0.5, delay: 0.05*Double(indexPath.row), options: [.curveEaseInOut], animations: {
                    cell.center.y = cell.center.y - cell.frame.height / 2
                    cell.alpha = 1
                }, completion: nil)
            }
        }
    }

}
