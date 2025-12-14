//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI
import SafariServices

extension String: @retroactive Identifiable {
    public var id: Self { self }
}

struct OtherAppsView: View {
    var body: some View {
        NavigationStack {
            Form{
                Section(header: Text("Explore")) {
                    Button {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappmychristmastree())!)
                    } label: {
                        HStack(spacing:10) {
                            Image(.appMyChristmasTree)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("My Christmas Tree")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: My Christmas Tree"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappsunrise())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appSunrise)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Sunrise")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Sunrise"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappharddisk())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appHardDisk)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Hard Disk")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Hard Disk"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappdatetoday())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appDateToday)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Date Today")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Date Today"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapphometab())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appMyLunarNewYear)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("My Lunar New Year")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: My Lunar New Year"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapptrafficblinker())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appTrafficBlinker)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Traffic Blinker")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Traffic Blinker"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapphometab())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appHomeTab)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Home Tab for Safari")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Home Tab for Safari"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappzoom())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appZoom)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Zoom for Safari")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Zoom for Safari"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappfullscreen())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appFullScreen)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Full Screen for Safari")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Full Screen for Safari"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappsnow())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appSnow)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Snow for Safari")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Snow for Safari"))
                    .accessibilityHint(Text("Opens in your web browser"))
                           
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappfontsizeincrease())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appFontSizeIncrease)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Font Size Increase for Safari")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Font Size Increase for Safari"))
                    .accessibilityHint(Text("Opens in your web browser"))
                          
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappfontsizedecrease())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appFontSizeDecrease)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Font Size Decrease for Safari")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: Font Size Decrease for Safari"))
                    .accessibilityHint(Text("Opens in your web browser"))
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappcanadarace())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appTheCanadaRace)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("The Canada Race")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    .accessibilityLabel(Text("Open app page: The Canada Race"))
                    .accessibilityHint(Text("Opens in your web browser"))

                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapphellooffice())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appHelloOffice)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                                .accessibilityHidden(true)
                            Text("Hello Office")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
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
