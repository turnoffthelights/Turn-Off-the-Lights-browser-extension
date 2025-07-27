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
                            Text("My Christmas Tree")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappsunrise())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appSunrise)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Sunrise")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappharddisk())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appHardDisk)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Hard Disk")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappdatetoday())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appDateToday)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Date Today")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapphometab())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appMyLunarNewYear)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("My Lunar New Year")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapptrafficblinker())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appTrafficBlinker)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Traffic Blinker")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapphometab())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appHomeTab)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Home Tab")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
                    
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webappcanadarace())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appTheCanadaRace)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("The Canada Race")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }

                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().webapphellooffice())!)
                    }) {
                        HStack(spacing:10) {
                            Image(.appHelloOffice)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Hello Office")
                        }.frame(maxWidth:.infinity, alignment: .leading)
                    }
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
