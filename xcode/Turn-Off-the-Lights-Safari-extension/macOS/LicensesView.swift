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
                    Text("Turn Off the Lights for Safari is free and open source software, released under the GNU General Public License v2.0. You are free to use, study, and modify the source code.")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                    Button(action: {
                        if let url = URL(string: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html") {
                            StefanFunctions().openURL(url)
                        }
                    }) {
                        Text("GNU General Public License v2.0 (GPL-2.0)")
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
