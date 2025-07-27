//
//  HelpView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

struct MenuItem: Identifiable {
    let id = UUID()
    let title: String
    let url: URL
}

struct HelpView: View {
    @Environment(\.dismiss) var dismiss
    @State private var isShareSheetPresented = false
    
    let HelpItems: [MenuItem] = [
        MenuItem(title: "Developer Website", url: URL(string: StefanLinks().linkdeveloperwebsite())!),
            MenuItem(title: "Privacy Policy", url: URL(string: StefanLinks().linkprivacy())!),
            MenuItem(title: "Support", url: URL(string: StefanLinks().linksupport())!)
        ]
    
    let versionNumber = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "Unknown"
    
    @State private var showGuide = false
    
    var body: some View {
        NavigationStack{
            Form{
                Section(header: Text("About")){
                    HStack{
                        Text("Icon")
                        Spacer()
                        Image("Abouticon")
                            .resizable()
                            .frame(width: 64, height: 64, alignment: .bottom)
                    }
                    
                    HStack{
                        Text("Name")
                        Spacer()
                        Text("Turn Off the Lights for Safari")
                    }
                    HStack{
                        Text("Version")
                        Spacer()
                        Text("\(versionNumber)")
                    }
                    HStack{
                        Text("Copyright")
                        Text("© 2025 Stefan vd")
                    }
                    NavigationLink {
                        LicensesView()
                    } label: {
                        Text("Licenses")
                    }
                }
                
                Section(header: Text("Guide")) {
                    Button("Welcome Guide") {
                        showGuide = true
                    }
                }
                
                Section(header: Text("Help"))
                {
                    ForEach(HelpItems) { menuItem in  Button(action: {
                        StefanFunctions().openURL(menuItem.url)
                    }) {
                        Text(menuItem.title)
                    }
                    }
                }
                
                Section(header: Text("Contribute & Develop"))
                {
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linktranslate())!)
                    }) {
                        Text("Help Translate Browser Extension")
                    }
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linksourccode())!)
                    }) {
                        Text("View Open-Source Code")
                    }

                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linkdonate())!)
                    }) {
                        Text("Make a Donation")
                    }
                }
                
                Section(header: Text("Explore & Connect"))
                {
                    NavigationLink {
                        OtherAppsView()
                    } label: {
                        Text("Other Apps")
                    }
                    Button(action: {
                        openreview()
                    }) {
                        Text("Rate & Review this App")
                    }
                    
                    ShareLink(item: productURL) {
                        Text("Share this App")
                    }
                }
            }
            .formStyle(.grouped)
            .navigationTitle("More")
        }
        .sheet(isPresented: $showGuide) {
            GuideView()
        }
    }
    
    var productURL = URL(string: StefanLinks().linkdeveloperwebsite())!
    
    func openreview() {
        // 1.
        var components = URLComponents(url: productURL, resolvingAgainstBaseURL: false)

        // 2.
        components?.queryItems = [
        URLQueryItem(name: "action", value: "write-review")
        ]

        // 3.
        guard let writeReviewURL = components?.url else {
        return
        }

        // 4.
        #if os(iOS)
        UIApplication.shared.open(writeReviewURL, options: [:], completionHandler: nil)
        #elseif os(macOS)
        NSWorkspace.shared.open(writeReviewURL)
        #endif
    }
}

#Preview {
    HelpView()
}
