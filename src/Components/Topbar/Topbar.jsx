import React from "react"
import "./Topbar.css"
import { NotificationsNone,Settings,Language } from "@mui/icons-material"

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="Logo">Fyllo</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBag">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBag">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="test" className="topAvatar"/>
        </div>
      </div>
    </div>
  )
}
