//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI
import SafariServices

extension String: @retroactive Identifiable {
    public var id: Self { self }
}

struct OtherAppsView: View {
    var body: some View {
        VStack {
            List() {
                Section(header: Text(StefanFunctions().i18string(text: "lblyouandus"))) {
                    Button {
                        openURL(URL(string: StefanFunctions().webappmychristmastree())!)
                    } label: {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppMyChristmasTree")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("My Christmas Tree")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webappmylunarnewyear())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppMyLunarNewYear")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("My Lunar New Year")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webapptrafficblinker())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppTrafficBlinker")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Traffic Blinker")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webappsunrise())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppSunrise")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Sunrise")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webappharddisk())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppHardDisk")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Hard Disk")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webappdatetoday())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppDateToday")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Date Today")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webappturnoffthelightssafari())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppTurnOfftheLights")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Turn Off the Lights")
                        }
                    }
                    
                    Button(action: {
                        openURL(URL(string: StefanFunctions().webapphometab())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppHomeTab")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Home Tab")
                        }
                    }

                    Button(action: {
                        openURL(URL(string: StefanFunctions().webappcanadarace())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppTheCanadaRace")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("The Canada Race")
                        }
                    }

                    Button(action: {
                        openURL(URL(string: StefanFunctions().webapphellooffice())!)
                    }) {
                        HStack(spacing:10) {
                            Image(uiImage: UIImage(named: "AppHelloOffice")!)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .cornerRadius(10)
                            Text("Hello Office")
                        }
                    }
                }
            }
            .navigationTitle(StefanFunctions().i18string(text: "lblotherapps"))
        }
        
    }
    
    func openURL(_ url: URL) {
           guard let absoluteURL = URL(string: url.absoluteString) else { return }
           UIApplication.shared.open(absoluteURL)
    }
}

#Preview {
    OtherAppsView()
}
