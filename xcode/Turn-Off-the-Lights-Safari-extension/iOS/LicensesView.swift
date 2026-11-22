//
//  LicensesView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

struct LicensesView: View {
    var body: some View {
        Form{
            Section {
                Text("This page provides information about the licenses governing the software and its components.")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
            
            Section(header: Text("Browser Extension"))
            {
                Text("Turn Off the Lights Safari Extension is free and Open Source software")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                Button(action: {
                    StefanFunctions().openURL(URL(string: "https://www.gnu.org/licenses/")!)
                }) {
                    Text("GNU General Public License v2.0")
                }
            }
        }
        .formStyle(.grouped)
        .navigationTitle("Licenses")
    }
}

#Preview {
    LicensesView()
}
