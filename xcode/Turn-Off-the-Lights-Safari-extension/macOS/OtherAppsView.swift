//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI
import SafariServices
import AppKit

extension String: @retroactive Identifiable {
    public var id: Self { self }
}

struct OtherAppsView: View {
    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Explore")) {
                    Button {
                        if let url = URL(string: StefanLinks().webappmychristmastree()) {
                            StefanLinks().openURL(url)
                        }
                    } label: {
                        HStack(spacing:10) {
                            
                            Image(nsImage: NSImage(named: "AppMyChristmasTree")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("My Christmas Tree")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: My Christmas Tree"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webappmylunarnewyear()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppMyLunarNewYear")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("My Lunar New Year")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: My Lunar New Year"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webapptrafficblinker()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppTrafficBlinker")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Traffic Blinker")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: Traffic Blinker"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webappsunrise()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppSunrise")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Sunrise")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: Sunrise"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webappharddisk()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppHardDisk")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Hard Disk")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: Hard Disk"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webappdatetoday()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppDateToday")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Date Today")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: Date Today"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webapphometab()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppHomeTab")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Home Tab")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: Home Tab"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webappcanadarace()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppTheCanadaRace")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("The Canada Race")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: The Canada Race"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        if let url = URL(string: StefanLinks().webapphellooffice()) {
                            StefanLinks().openURL(url)
                        }
                    }) {
                        HStack(spacing:10) {
                            Image(nsImage: NSImage(named: "AppHelloOffice")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Hello Office")
                        }
                    }
                    .buttonStyle(.link)
                    .accessibilityLabel(Text("Open app page: Hello Office"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                }
                
            }
            .formStyle(.grouped)
            .navigationTitle("Other Apps")
        }
    }
}

#Preview {
    OtherAppsView()
}
