import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import type { Submission } from '@/types/submission'

export default function AdminPage() {
  const [subs, setSubs] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('./api/submissions')
      setSubs(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const del = async (id: string) => {
    if (!confirm('确定删除这条提交记录？')) return
    await fetch(`./api/submissions?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    load()
  }

  const exportCsv = () => {
    const header = ['班级', '类型', '组长姓名', '组长学号', '组员1姓名', '组员1学号', '组员2姓名', '组员2学号', '组员3姓名', '组员3学号', 'GitHub地址', '人数', '小组系数', '提交时间']
    const rows = subs.map((s) => [
      s.className,
      s.mode === 'solo' ? '单人' : '小组',
      s.leaderName, s.leaderSid,
      s.members[0]?.name ?? '', s.members[0]?.sid ?? '',
      s.members[1]?.name ?? '', s.members[1]?.sid ?? '',
      s.members[2]?.name ?? '', s.members[2]?.sid ?? '',
      s.githubUrl ?? '',
      s.groupSize, s.coefficient,
      new Date(s.createdAt).toLocaleString(),
    ])
    const csv = '﻿' + [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `作业分组确认_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const filtered = subs.filter((s) =>
    !filter || s.className.includes(filter) || s.leaderName.includes(filter) || s.leaderSid.includes(filter)
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-2xl">分组提交汇总（教师端）</CardTitle>
              <CardDescription>共 {subs.length} 组提交 · 小组 {subs.filter((s) => s.mode === 'group').length} · 单人 {subs.filter((s) => s.mode === 'solo').length}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={load}>刷新</Button>
              <Button onClick={exportCsv} disabled={!subs.length}>导出 CSV</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="按班级 / 组长姓名 / 学号筛选…" value={filter} onChange={(e) => setFilter(e.target.value)} className="max-w-sm" />
            <div className="rounded-md border bg-white overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>班级</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>组长</TableHead>
                    <TableHead>组员1</TableHead>
                    <TableHead>组员2</TableHead>
                    <TableHead>组员3</TableHead>
                    <TableHead>GitHub</TableHead>
                    <TableHead className="text-center">人数</TableHead>
                    <TableHead className="text-center">系数</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={11} className="text-center text-slate-400 py-8">加载中…</TableCell></TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={11} className="text-center text-slate-400 py-8">暂无提交记录</TableCell></TableRow>
                  ) : filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.className}</TableCell>
                      <TableCell>{s.mode === 'solo' ? <Badge variant="outline">单人</Badge> : <Badge>小组</Badge>}</TableCell>
                      <TableCell className="whitespace-nowrap">{s.leaderName}<span className="text-slate-400 text-xs ml-1">{s.leaderSid}</span></TableCell>
                      {[0, 1, 2].map((i) => (
                        <TableCell key={i} className="whitespace-nowrap">
                          {s.members[i] ? <>{s.members[i].name}<span className="text-slate-400 text-xs ml-1">{s.members[i].sid}</span></> : '—'}
                        </TableCell>
                      ))}
                      <TableCell>
                        {s.githubUrl ? (
                          <a href={s.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline whitespace-nowrap" title={s.githubUrl}>打开仓库 ↗</a>
                        ) : '—'}
                      </TableCell>
                      <TableCell className="text-center">{s.groupSize}</TableCell>
                      <TableCell className="text-center font-medium text-indigo-600">×{s.coefficient}</TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-slate-500">{new Date(s.createdAt).toLocaleString()}</TableCell>
                      <TableCell><Button variant="ghost" size="sm" className="text-red-500" onClick={() => del(s.id)}>删除</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
