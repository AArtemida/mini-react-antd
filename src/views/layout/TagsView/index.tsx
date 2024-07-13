import React, { useState } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectVisitedViews, delTabView } from '@/store/reducers/tags'

const TagsView: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const visitedViews = useSelector(selectVisitedViews)

  // 是否当前选中
  function isActive(path) {
    return path === location.pathname
  }
  // 改变选中项
  function changeSelectedTag(tag) {
    navigate(tag.path)
  }
  // 删除标签
  function closeSelectedTag(e, tag) {
    e?.stopPropagation()
    const path = tag.path
    dispatch(delTabView(path))
  }
  return (
    <div className="tab-view-box">
      {visitedViews.map(tag => (
        <span
          key={tag.path}
          className={'tag-view-item ' + (isActive(tag.path) ? 'active' : '')}
          onClick={() => changeSelectedTag(tag)}
        >
          {tag.title}
          {isActive(tag.path) || tag.isFixed ? null : (
            <CloseCircleOutlined onClick={e => closeSelectedTag(e, tag)} />
          )}
        </span>
      ))}
    </div>
  )
}

export default TagsView
