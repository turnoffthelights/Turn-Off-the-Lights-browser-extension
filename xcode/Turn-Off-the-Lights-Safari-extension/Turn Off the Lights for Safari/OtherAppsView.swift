//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI
import SafariServices

extension String: Identifiable {
    public var id: Self { self }
}

struct OtherAppsView: View {
    var body: some View {
        VStack {
            List() {
                Section(header: Text(Stefanfunctions().i18string(text: "lblyouandus"))) {
                    Button {
                        openURL(URL(string: Stefanfunctions().webappmychristmastree())!)
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
                        openURL(URL(string: Stefanfunctions().webappmylunarnewyear())!)
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
                        openURL(URL(string: Stefanfunctions().webapptrafficblinker())!)
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
                        openURL(URL(string: Stefanfunctions().webappsunrise())!)
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
                        openURL(URL(string: Stefanfunctions().webappharddisk())!)
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
                        openURL(URL(string: Stefanfunctions().webappdatetoday())!)
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
                        openURL(URL(string: Stefanfunctions().webappturnoffthelightssafari())!)
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
                        openURL(URL(string: Stefanfunctions().webapphometab())!)
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
                        openURL(URL(string: Stefanfunctions().webappcanadarace())!)
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
                        openURL(URL(string: Stefanfunctions().webapphellooffice())!)
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
            .navigationTitle(Stefanfunctions().i18string(text: "lblotherapps"))
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
