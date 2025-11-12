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
    
    private var versionNumber: String {
        let appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "Unknown"
        let buildNumber = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "?"
        return "\(appVersion) (\(buildNumber))"
    }
    
    @State private var showGuide = false
    
    var body: some View {
        NavigationStack{
            Form{
                Section(header: Text("About")){
                    HStack{
                        Text("Icon")
                        Spacer()
                        Image("about-logo")
                            .resizable()
                            .frame(width: 64, height: 64, alignment: .bottom)
                            .accessibilityHidden(true)
                    }
                    
                    HStack{
                        Text("Name")
                        Spacer()
                        Text("Turn Off the Lights for Safari")
                    }
                    .accessibilityElement(children: .combine)
                    
                    HStack{
                        Text("Version")
                        Spacer()
                        Text("\(versionNumber)")
                    }
                    .accessibilityElement(children: .combine)
                    
                    HStack{
                        Text("Copyright")
                        Text("© 2025 Stefan vd")
                    }
                    .accessibilityElement(children: .combine)
                    
                    NavigationLink {
                        LicensesView()
                    } label: {
                        Text("Licenses")
                    }
                    .accessibilityHint(Text("Shows licenses used in this app"))
                }
                
                Section(header: Text("Guide")) {
                    Button("Welcome Guide") {
                        showGuide = true
                    }
                    .accessibilityHint(Text("Opens the welcome guide"))
                }
                
                Section(header: Text("Help"))
                {
                    ForEach(HelpItems) { menuItem in  Button(action: {
                        StefanFunctions().openURL(menuItem.url)
                    }) {
                        Text(menuItem.title)
                    }
                    .accessibilityHint(Text("Opens in your web browser"))
                    }
                }
                
                Section(header: Text("Contribute & Develop"))
                {
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linktranslate())!)
                    }) {
                        Text("Help Translate Browser Extension")
                    }
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linksourccode())!)
                    }) {
                        Text("View Open-Source Code")
                    }
                    .accessibilityHint(Text("Opens in your web browser"))

                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linkdonate())!)
                    }) {
                        Text("Make a Donation")
                    }
                    .accessibilityHint(Text("Opens in your web browser"))
                }
                
                Section(header: Text("Explore & Connect"))
                {
                    NavigationLink {
                        OtherAppsView()
                    } label: {
                        Text("Other Apps")
                    }
                    .accessibilityHint(Text("Shows other apps"))
                    
                    Button(action: {
                        openreview()
                    }) {
                        Text("Rate & Review this App")
                    }
                    .accessibilityHint(Text("Opens the review page in your web browser"))
                    
                    ShareLink(item: productURL) {
                        Text("Share this App")
                    }
                    .accessibilityHint(Text("Opens the system share menu"))
                }
            }
            .formStyle(.grouped)
            .navigationTitle("More")
        }
        .sheet(isPresented: $showGuide) {
            GuideView()
                .interactiveDismissDisabled()
                .accessibilityAddTraits(.isModal)
        }
    }
    
    var productURL = URL(string: StefanLinks().linkdeveloperwebsite())!
    
    func openreview() {
        var components = URLComponents(url: productURL, resolvingAgainstBaseURL: false)

        components?.queryItems = [
        URLQueryItem(name: "action", value: "write-review")
        ]

        guard let writeReviewURL = components?.url else {
        return
        }

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
