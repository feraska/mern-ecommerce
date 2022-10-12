import React from 'react'
import CommentCard from './CommentCard'
import './commentCard.css'
import { useTranslation } from 'react-i18next'
const CommentItem = ({comment}) => {
  const { t } = useTranslation();  
  return (
    <>
    <CommentCard comment={comment}>
    {/* <div className='nav_comment'>
    <p>Reply</p>
    <p>Load more comments</p>
    <p>Hide Reply</p>
    </div> */}
    </CommentCard>
    </>
  )
}

export default CommentItem
