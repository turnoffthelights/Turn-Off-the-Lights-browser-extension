//
//  ContentView.swift
//  Turn Off the Lights for Safari macOS
//
//  Created by Stefan Van Damme on 06/10/2025.
//

import SwiftUI
import SafariServices
import Combine
import AppKit
import AVFoundation
import AVKit

struct EnableView: View {
    private let extensionBundleIdentifier = "com.stefanvd.Turn-Off-the-Lights-for-Safari.Extension"

    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var isEnabled: Bool?
    @State private var errorMessage: String?
    @State private var timer: Publishers.Autoconnect<Timer.TimerPublisher> = Timer.publish(every: 0.5, on: .main, in: .common).autoconnect()
    @State private var player = AVPlayer(url: Bundle.main.url(forResource: "DaringInfantileDachshund", withExtension: "mp4")!)

    var body: some View {
        Form {
            VStack(spacing: 0) {
                HStack(spacing: 4) {
                    Image("LargeIcon")
                        .resizable()
                        .interpolation(.high)
                        .antialiased(false)
                        .frame(width: 16, height: 16)

                    Text("Turn Off the Lights™")
                        .font(.title)
                        .multilineTextAlignment(.center)
                        .textSelection(.enabled)
                }
                .padding(.top, 10)
                .padding(.bottom, 6)

                ZStack{
                    // Replace the plain image with a 3D-tilting version
                    Tilt3D(maxRotation: 10, maxTranslation: 8, maxScale: 1.03, shadowOffset: 12, cornerRadius: 8) {
                        ZStack{
                        Image("safariWebBrowser")
                            .resizable()
                            .frame(width: 400, height: 250)
                            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                        
                        VideoPlayerView(player: player, showsPlaybackControls: false)
                            .frame(width: 242, height: 136)
                            .clipped()
                            .allowsHitTesting(false)
                            .onAppear {
                                if reduceMotion == false {
                                    startLoopingVideo()
                                } else {
                                    stopVideo()
                                }
                            }
                            .onChange(of: reduceMotion) { _, newValue in
                                if newValue == false {
                                    startLoopingVideo()
                                } else {
                                    stopVideo()
                                }
                            }
                            .cornerRadius(4)
                            .padding(.bottom, 20)
                            .padding(.trailing, 116)
                        }
                    }
                }
                .frame(width: 400, height: 250)
                
                statusView
                    .frame(height: 22)
                    .padding(.bottom, 12)
                
                VStack(spacing: 0) {
                    Button {
                        openSafariExtensionPreferences()
                    } label: {
                        Text(primaryButtonTitle)
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.large)
                    .keyboardShortcut(.defaultAction)

                    Group {
                        if let errorMessage {
                            Text(errorMessage)
                                .font(.footnote)
                                .foregroundStyle(.red)
                                .multilineTextAlignment(.center)
                                .lineLimit(3)
                                .fixedSize(horizontal: false, vertical: true)
                                .transition(.opacity)
                                .padding(.top, 4)
                                .padding(.bottom, 4)
                        } else {
                            Text(verbatim: "")
                                .font(.footnote)
                                .opacity(0)
                        }
                    }

                    Text("You can manage the extension from Safari’s Extensions preferences. This window updates automatically after you enable it.")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            .padding(.horizontal, 24)
            .frame(minWidth: 520)
        }
        .toolbar {
            ToolbarItemGroup(placement: .primaryAction) {
                Button(action: {
                    StefanFunctions().openURL(URL(string: StefanLinks().linkredirectionoptions())!)
                }) {
                    Label("Options", systemImage: "gear")
                        .labelStyle(.titleOnly)
                }
            }

            ToolbarItemGroup(placement: .primaryAction) {
                ShareLink("",
                          item: URL(string: StefanLinks().linkappstore())!,
                          subject: Text("FREE Turn Off the Lights Safari extension"),
                          message: Text("Download the free Turn Off the Lights Safari extension to get Dark Mode on all websites. Try it yourself! via @TurnOfftheLight  \(StefanLinks().linkdeveloperwebsite())"))
            }
        }
        .formStyle(.grouped)
        .navigationTitle("")
        .onAppear {
            refreshExtensionState(initial: true)
        }
        .onReceive(timer) { _ in
            refreshExtensionState(initial: false)
        }
    }

    private var primaryButtonTitle: String {
        switch isEnabled {
        case .some(true):  return "Manage in Safari…"
        case .some(false): return "Enable in Safari…"
        default:           return "Open Safari Extensions Preferences…"
        }
    }

    @ViewBuilder
    private var statusView: some View {
        ZStack {
            Label {
                Text("Safari extension is Enabled")
                    .font(.headline)
            } icon: {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(.green)
            }
            .opacity(isEnabled == true ? 1 : 0)

            Label {
                Text("Safari extension is Disabled")
                    .font(.headline)
            } icon: {
                Image(systemName: "xmark.circle.fill")
                    .foregroundStyle(.red)
            }
            .opacity(isEnabled == false ? 1 : 0)

            HStack(spacing: 10) {
                ProgressView()
                Text("Checking extension status…")
                    .font(.headline)
            }
            .opacity(isEnabled == nil ? 1 : 0)
        }
        .animation(.easeInOut(duration: 0.2), value: isEnabled)
    }

    private func startLoopingVideo() {
        player.isMuted = true
        player.actionAtItemEnd = .none
        player.play()
        NotificationCenter.default.addObserver(
            forName: .AVPlayerItemDidPlayToEndTime,
            object: player.currentItem,
            queue: nil
        ) { _ in
            player.seek(to: .zero)
            player.play()
        }
    }

    private func stopVideo() {
        player.pause()
    }

    private func refreshExtensionState(initial: Bool) {
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { state, error in
            DispatchQueue.main.async {
                if let error {
                    // print("refreshExtensionState error:", error.localizedDescription)
                    self.errorMessage = error.localizedDescription
                    self.isEnabled = nil
                } else {
                    let enabled = state?.isEnabled
                    // print("refreshExtensionState initial=\(initial), state?.isEnabled =", enabled as Any)
                    self.errorMessage = nil
                    self.isEnabled = enabled ?? false
                }
            }
        }
    }

    private func openSafariExtensionPreferences() {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            if let error {
                DispatchQueue.main.async {
                    print("showPreferencesForExtension error:", error.localizedDescription)
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }
}

#Preview {
    EnableView()
        .frame(width: 600, height: 450)
}

// MARK: - Tilt3D
private struct Tilt3D<Content: View>: View {
    var maxRotation: Double = 10
    var maxTranslation: CGFloat = 8
    var maxScale: CGFloat = 1.03
    var shadowOffset: CGFloat = 12
    var cornerRadius: CGFloat = 10
    @ViewBuilder var content: Content

    @State private var isHovering = false
    @State private var normalizedPoint: CGPoint = .zero // (-1...1, -1...1)

    var body: some View {
        GeometryReader { geo in
            let size = geo.size
            let rotationX = -Double(normalizedPoint.y) * maxRotation
            let rotationY = Double(normalizedPoint.x) * maxRotation
            let translateX = normalizedPoint.x * maxTranslation
            let translateY = normalizedPoint.y * maxTranslation
            let scale = isHovering ? maxScale : 1.0
            let shadowX = normalizedPoint.x * shadowOffset
            let shadowY = normalizedPoint.y * shadowOffset

            content
                .scaleEffect(scale)
                .rotation3DEffect(.degrees(rotationX), axis: (x: 1, y: 0, z: 0), anchor: .center, perspective: 0.6)
                .rotation3DEffect(.degrees(rotationY), axis: (x: 0, y: 1, z: 0), anchor: .center, perspective: 0.6)
                .offset(x: translateX, y: translateY)
                .shadow(color: Color.black.opacity(isHovering ? 0.25 : 0.12), radius: isHovering ? 18 : 8, x: shadowX, y: shadowY)
                .animation(.spring(response: 0.35, dampingFraction: 0.75), value: isHovering)
                .animation(.interactiveSpring(response: 0.25, dampingFraction: 0.8), value: normalizedPoint)
                .background(
                    RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                        .fill(Color.clear)
                )
                .contentShape(Rectangle())
                .modifier(MouseTracker(size: size) { location, hovering in
                    isHovering = hovering
                    if hovering {
                        // Normalize to (-1...1)
                        let nx = ((location.x / max(size.width, 1)) - 0.5) * 2
                        let ny = ((location.y / max(size.height, 1)) - 0.5) * 2
                        normalizedPoint = CGPoint(x: max(min(nx, 1), -1), y: max(min(ny, 1), -1))
                    } else {
                        normalizedPoint = .zero
                    }
                })
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
    }
}

private struct MouseTracker: ViewModifier {
    let size: CGSize
    let onUpdate: (CGPoint, Bool) -> Void

    func body(content: Content) -> some View {
        content
            .background(TrackingRepresentable(onUpdate: onUpdate))
    }

    private struct TrackingRepresentable: NSViewRepresentable {
        let onUpdate: (CGPoint, Bool) -> Void

        func makeNSView(context: Context) -> TrackingNSView {
            let v = TrackingNSView()
            v.onUpdate = onUpdate
            return v
        }

        func updateNSView(_ nsView: TrackingNSView, context: Context) {
            // no-op
        }
    }

    private final class TrackingNSView: NSView {
        var onUpdate: ((CGPoint, Bool) -> Void)?
        private var trackingArea: NSTrackingArea?

        override func updateTrackingAreas() {
            super.updateTrackingAreas()
            if let trackingArea { removeTrackingArea(trackingArea) }
            let options: NSTrackingArea.Options = [
                .mouseMoved, .mouseEnteredAndExited, .activeInKeyWindow, .inVisibleRect
            ]
            let area = NSTrackingArea(rect: bounds, options: options, owner: self, userInfo: nil)
            addTrackingArea(area)
            trackingArea = area
        }

        override func mouseEntered(with event: NSEvent) {
            let point = convert(event.locationInWindow, from: nil)
            onUpdate?(point, true)
        }

        override func mouseMoved(with event: NSEvent) {
            let point = convert(event.locationInWindow, from: nil)
            onUpdate?(point, true)
        }

        override func mouseExited(with event: NSEvent) {
            onUpdate?(.zero, false)
        }
    }
}
