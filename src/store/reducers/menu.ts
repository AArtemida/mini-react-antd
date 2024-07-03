import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserMenus } from '@/api/user'

export const fetchMenus = createAsyncThunk(
  'menu/fetchMenus',
  async (arg, { dispatch, getState, extra }) => {
    const res = await getUserMenus()
    return res.data
  }
)

// 初始状态
const initialState = {
  menus: [],
  loading: true,
  error: null, // 可能的错误信息
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    fetchMenusRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchMenusSuccess(state, action) {
      state.loading = false
      state.menus = action.payload
    },
    fetchMenusFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMenus.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false
        state.menus = action.payload
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// Action creators
export const { fetchMenusRequest, fetchMenusSuccess, fetchMenusFailure } =
  menuSlice.actions

// Selector functions
export const selectMenus = state => state.menu.menus
export const selectLoading = state => state.menu.loading
export const selectError = state => state.menu.error

// Export the reducer, wrapped by the `outputSelector` function for easy usage with `useSelector`
export default menuSlice.reducer
