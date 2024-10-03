//
//  SimpleTableViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 18/06/2021.
//

import UIKit

class SimpleTableViewController: UIViewController {
    
    var collectionView: UICollectionView!
    var datasource: UICollectionViewDiffableDataSource<Section, Item>!
    
    lazy var mainSectionItems = [Item(type: .row, title: "Home", image: UIImage(systemName: "house")!),
                                 Item(type: .row, title: "Videos", image: UIImage(systemName: "film")!),
                                 Item(type: .row, title: "News", image: UIImage(systemName: "newspaper")!),
                                 Item(type: .row, title: "More", image: UIImage(systemName: "ellipsis")!)
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        configureCollectionView()
        configureDataSource()
        applyInitialData()
        
        // Programmatically change the font size to get the complete brand visible
        navigationController?.navigationBar.largeTitleTextAttributes = [.font: UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.bold)]

        // select default
        collectionView.selectItem(at: NSIndexPath(item: 0, section: 0) as IndexPath, animated: true, scrollPosition: .init())
    }
}

extension SimpleTableViewController {
    
    private func configureLayout() -> UICollectionViewLayout {
        let config = UICollectionLayoutListConfiguration(appearance: .sidebar)
        return UICollectionViewCompositionalLayout.list(using: config)
    }

    private func configureCollectionView() {
        collectionView = UICollectionView(frame: view.bounds, collectionViewLayout: self.configureLayout())
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.delegate = self
        view.addSubview(collectionView)
    }
    
    private func configureDataSource() {
        let headerRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Item> {
            (cell, indexPath, item) in

            var contentConfiguration = UIListContentConfiguration.sidebarHeader()
            contentConfiguration.text = item.title
     
            cell.contentConfiguration = contentConfiguration
        }
        
        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Item> { (cell, indexPath, item) in
            var content = cell.defaultContentConfiguration()
            content.text = item.title
            content.image = item.image
            cell.contentConfiguration = content
        }
        
        datasource = UICollectionViewDiffableDataSource<Section, Item>(collectionView: collectionView) {
        (collectionView, indexPath, item) -> UICollectionViewCell in
            switch item.type {
            case .header:
                return collectionView.dequeueConfiguredReusableCell(using: headerRegistration, for: indexPath, item: item)
            case .row:
                return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: item)
            }
        }
    }
    
    private func applyInitialData() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Item>()
        snapshot.appendSections([.main])
        snapshot.appendItems(mainSectionItems, toSection: .main)
        datasource.apply(snapshot, animatingDifferences: false)
    }
    
}

extension SimpleTableViewController: UICollectionViewDelegate {

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        //print("Item at indexPath \(indexPath) selected!")
        let defaults = UserDefaults(suiteName: "group.stefanvd.turnoffthelightsforsafari")
        
        if(indexPath == [0, 0]){
            defaults!.set(0, forKey: "currentopentab")
            performSegue(withIdentifier: "showtab0", sender: nil)
        }else if(indexPath == [0, 1]){
            defaults!.set(1, forKey: "currentopentab")
            performSegue(withIdentifier: "showtab1", sender: nil)
        }else if(indexPath == [0, 2]){
            defaults!.set(2, forKey: "currentopentab")
            performSegue(withIdentifier: "showtab2", sender: nil)
        }else if(indexPath == [0, 3]){
            defaults!.set(3, forKey: "currentopentab")
            performSegue(withIdentifier: "showtab3", sender: nil)
        }
        
    }
    
}
