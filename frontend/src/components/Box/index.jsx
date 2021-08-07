import React from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import * as style from './styled'
import { useHistory } from 'react-router-dom'

export default function Box({ hasShadow = false, maxWidth, title, backPath, titleSize, children }) {
  const history = useHistory()
  return (
    <style.BoxWrapper hasShadow={hasShadow} maxWidth={maxWidth}>
      <style.BoxHeader>
        <style.BackButton className="btn" onClick={() => backPath ? history.push(backPath) : history.goBack()}>
          <MdKeyboardBackspace />
        </style.BackButton>
        <style.Title titleSize={titleSize}>{title}</style.Title>
      </style.BoxHeader>
      <style.BoxBody>
        {children}
      </style.BoxBody>
    </style.BoxWrapper>
  )
}

