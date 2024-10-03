//
//  HomeView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 01/03/2024.
//

import SwiftUI
import SafariServices
import LinkPresentation

struct Item {
    var appName: String
    var appDes: String
    var appImage: String
    var appButton: String
    var appDownloadLink: String
}

enum ItemType {
    case row
}

struct HomeView: View {
    
    let mainSectionItems = [
        Item(appName: Stefanfunctions().i18string(text: "strworldpremiere"), appDes: Stefanfunctions().i18string(text: "strdesworldpremiere"), appImage: "lock.shield.fill", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/blog/"),
        Item(appName: Stefanfunctions().i18string(text: "strtranslator"), appDes: Stefanfunctions().i18string(text: "strdestranslator"), appImage: "rectangle.3.group.bubble.left.fill", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/translator/"),
        Item(appName: Stefanfunctions().i18string(text: "strdeveloper"), appDes: Stefanfunctions().i18string(text: "strdesdeveloper"), appImage: "chevron.left.forwardslash.chevron.right", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/developer/"),
        Item(appName: Stefanfunctions().i18string(text: "strsocial"), appDes: Stefanfunctions().i18string(text: "strdessocial"), appImage: "heart.circle.fill", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/social/")
    ]
    let websitelink = "https://www.turnoffthelights.com"
    
    var body: some View {
        ScrollView{
            VStack (spacing:20){
                HStack{
                    Text(Stefanfunctions().i18string(text: "lblturnoffthelightsforsafari"))
                        .font(.largeTitle)
                        .padding(.top, 20)
                        .padding(.bottom, 10)
                 Spacer()
                    Button(action: {
                        if let url = URL(string: "https://www.turnoffthelights.com/browser/extension/options/") {
                            UIApplication.shared.open(url)
                        }
                    }) {
                        Text("Options")
                            .font(.headline)
                    }
                    
                    ShareLink("", item: URL(string: Stefanfunctions().webappturnoffthelightssafari())!,
                        subject: Text(Stefanfunctions().i18string(text: "lblemailsubject")),
                        message: Text(Stefanfunctions().i18string(text: "lblshareregular") + " " + websitelink))
                }
                VStack(alignment: .leading, spacing: 20) {
                                StepView(iconName: "gear.circle.fill", color: .gray, step: 1, stepText1: NSLocalizedString("bannerstep1a", comment: ""), stepText2: NSLocalizedString("bannerstep1b", comment: ""), stepText3: NSLocalizedString("bannerstep1c", comment: ""))
                                StepView(iconName: "safari.fill", color: .blue, step: 2, stepText1: NSLocalizedString("bannerstep2a", comment: ""), stepText2: NSLocalizedString("bannerstep2b", comment: ""))
                                StepView(iconName: "puzzlepiece.extension.fill", color: .green, step: 3, stepText1: NSLocalizedString("bannerstep3a", comment: ""), stepText2: NSLocalizedString("bannerstep3b", comment: ""))
                                StepView(iconName: "power.circle.fill",  color: .orange, step: 4, stepText1: NSLocalizedString("bannerstep4a", comment: ""), stepText2: NSLocalizedString("bannerstep4b", comment: ""))
                                StepView(iconName: "plus.circle.fill",  color: .teal, step: 5, stepText1: NSLocalizedString("bannerstep5a", comment: ""), stepText2: NSLocalizedString("bannerstep5b", comment: ""), stepText3: NSLocalizedString("bannerstep5c", comment: ""))
                            }
                            .padding()
                            .frame(minWidth: 0, maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
                            .background(.regularMaterial)
                            .cornerRadius(16)
                            .shadow(radius: 3)
                
                
                LazyVGrid(columns: [
                    GridItem(spacing:20),
                    GridItem(spacing:20)
                ], spacing: 20) {
                    ForEach(mainSectionItems, id: \.appName) { item in
                        CellView(item: item)
                    }
                }
                Spacer()
            }
            .padding()
            
        }
    }
}

struct StepView: View {
    var iconName: String
    var color: Color = .black // Default color
    var step: Int
    var stepText1: String
    var stepText2: String
    var stepText3: String?
    
    var body: some View {
        HStack(spacing: 15) {
            Image(systemName: iconName)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 40, height: 40)
                .foregroundColor(color) // Use provided color
            VStack(alignment: .leading, spacing: 5) {
                Text("Step \(step)")
                    .font(.headline)
                Text("\(stepText1) \(stepText2)\(stepText3 != nil ? " \(stepText3!)" : "")")
                    .font(.body)
            }
        }
    }
}

struct CellView: View {
    let item: Item
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(item.appName.uppercased())
                .font(.headline)
            
            Text(item.appDes)
                .font(.subheadline)
            
            Spacer()
            
            HStack {
                Image(systemName: item.appImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 64, height: 64)
                    .foregroundColor(.blue)
                
                Spacer() // Pushes the button to the right
                
                Button(action: {
                    // Action to perform when the button is tapped
                    if let url = URL(string: item.appDownloadLink) {
                        UIApplication.shared.open(url)
                    }
                }) {
                    Text(item.appButton)
                        .font(.subheadline)
                }
                .padding(.top, 8) // Add some top padding to the button
            }
        }
        .padding()
        .frame(minWidth: 0, maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .background(.regularMaterial)
        .cornerRadius(16)
        .shadow(radius: 3)
        .frame(height: 210)

    }
}

#Preview {
    HomeView()
}
