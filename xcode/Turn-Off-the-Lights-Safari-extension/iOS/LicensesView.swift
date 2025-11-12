//
//  LicensesView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

struct LicensesView: View {
    var body: some View {
        NavigationStack {
            Form{
                Section(header: Text("Browser Extension"))
                {
                    Button(action: {
                        StefanFunctions().openURL(URL(string: "https://www.gnu.org/licenses/")!)
                    }) {
                        Text("GPL 2.0")
                    }
                }
            }
            .formStyle(.grouped)
            .navigationTitle("Licenses")
        }
    }
}

#Preview {
    LicensesView()
}
