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
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
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
    @State private var selectedDetail: MoreDetailItem?
    @State private var showingOtherApps = false

    enum MoreDetailItem: Hashable {
        case welcome, licenses, guide, help, contribute, explore
    }
    
    private var currentYear: String {
        String(Calendar.current.component(.year, from: Date()))
    }
    
    private var copyrightText: String {
        "© \(currentYear) Stefan vd"
    }
    
    var body: some View {
        NavigationSplitView {
            sidebarView
        } detail: {
            NavigationStack {
                detailView
                    .navigationDestination(isPresented: $showingOtherApps) {
                        OtherAppsView()
                    }
            }
        }
        .navigationSplitViewStyle(.balanced)
        .onAppear {
            if selectedDetail == nil && horizontalSizeClass == .regular {
                selectedDetail = .licenses
            }
        }
        .onChange(of: selectedDetail) { _, newSelection in
            if let newSelection, newSelection != .explore {
                showingOtherApps = false
            }
        }
        .onChange(of: horizontalSizeClass) { _, newSizeClass in
            if newSizeClass == .regular {
                if selectedDetail == nil {
                    selectedDetail = .licenses
                }
            } else if let selection = selectedDetail {
                let otherApps = showingOtherApps
                selectedDetail = nil
                DispatchQueue.main.async {
                    selectedDetail = selection
                    showingOtherApps = otherApps
                }
            }
        }
        .sheet(isPresented: $showGuide) {
            GuideView()
                .interactiveDismissDisabled()
                .accessibilityAddTraits(.isModal)
        }
    }

    private var sidebarView: some View {
        List(selection: $selectedDetail) {
            Section(header: Text("About")){
                aboutInfoRows

                Text("Licenses")
                    .tag(MoreDetailItem.licenses)
            }

            Section(header: Text("More")){
                Text("Welcome Guide")
                    .tag(MoreDetailItem.guide)
                Text("Help")
                    .tag(MoreDetailItem.help)
                Text("Contribute & Develop")
                    .tag(MoreDetailItem.contribute)
                Text("Explore & Connect")
                    .tag(MoreDetailItem.explore)
            }
        }
        .listStyle(.sidebar)
        .navigationTitle("More")
        .onAppear {
            if horizontalSizeClass == .compact {
                selectedDetail = nil
            }
        }
    }

    @ViewBuilder
    private var detailView: some View {
        switch selectedDetail ?? .welcome {
        case .welcome:
            detailPlaceholder
        case .licenses:
            LicensesView()
        case .guide:
            Form { guideSection }
                .formStyle(.grouped)
                .navigationTitle("Guide")
        case .help:
            Form { helpSection }
                .formStyle(.grouped)
                .navigationTitle("Help")
        case .contribute:
            Form { contributeSection }
                .formStyle(.grouped)
                .navigationTitle("Contribute & Develop")
        case .explore:
            Form { exploreSection }
                .formStyle(.grouped)
                .navigationTitle("Explore & Connect")
        }
    }

    private var detailPlaceholder: some View {
        VStack(spacing: 16) {
            Spacer()
            Image("about-logo")
                .resizable()
                .frame(width: 128, height: 128)
                .accessibilityHidden(true)
            Text("Turn Off the Lights for Safari")
                .font(.title2)
                .bold()
            Text("Version \(versionNumber)")
                .foregroundStyle(.secondary)
            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(uiColor: .systemGroupedBackground))
    }

    @ViewBuilder
    private var aboutInfoRows: some View {
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
            Text(copyrightText)
        }
        .accessibilityElement(children: .combine)
    }

    private var guideSection: some View {
        Section(header: Text("Guide")) {
            Button("Welcome Guide") {
                showGuide = true
            }
            .accessibilityHint(Text("Opens the welcome guide"))
        }
    }

    private var helpSection: some View {
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
    }

    private var contributeSection: some View {
        Section(header: Text("Contribute & Develop"))
        {
            Button(action: {
                StefanFunctions().openURL(URL(string: StefanLinks().linktranslate())!)
            }) {
                Text("Help Translate Browser Extension")
            }
            .accessibilityHint(Text("Opens in your web browser"))

            Button(action: {
                StefanFunctions().openURL(URL(string: StefanLinks().linksourcecode())!)
            }) {
                Text("View Open-Source Code")
            }
            .accessibilityHint(Text("Opens in your web browser"))

            /*
            Button(action: {
                StefanFunctions().openURL(URL(string: StefanLinks().linkdonate())!)
            }) {
                Text("Make a Donation")
            }
            .accessibilityHint(Text("Opens in your web browser"))
            */
        }
    }

    private var exploreSection: some View {
        Section(header: Text("Explore & Connect"))
        {
            Button {
                selectedDetail = .explore
                showingOtherApps = true
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
    
    var productURL = URL(string: StefanLinks().webappturnoffthelights())!
    
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
