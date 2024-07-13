import { createSlice } from '@reduxjs/toolkit'

// 初始状态
const initialState = {
  visitedViews: [
    {
      path: '/',
      title: '首页',
      isFixed: true,
    },
  ],
  history: ['/'],
}

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    // 新增
    addTabView(state, action) {
      const tag = action.payload
      state.history.push(tag.path)

      state.visitedViews.push(tag)
    },
    // 删除
    delTabView(state, action) {
      const path = action.payload
      state.history = state.history.filter(r => r !== path)
      state.visitedViews = state.visitedViews.filter(r => {
        return r.path !== path
      })
    },
    // 清空
    clearTabView(state) {
      state.visitedViews = []
    },
  },
})

// Action creators
export const { addTabView, delTabView, clearTabView } = tagSlice.actions

export const selectVisitedViews = state => state.tags.visitedViews
export const selectHistoryList = state => state.tags.history

export default tagSlice.reducer
