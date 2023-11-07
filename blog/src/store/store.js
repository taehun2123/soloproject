import { create } from 'zustand'

export const usePostStore = create((set)=>({
  hlist : "",
  setHlist : (val) => set( (state) => ({ hlist : state }) ),
  plist : "",
  setPlist : (val) => set( (state) => ({ hlist : state }) )
}))
