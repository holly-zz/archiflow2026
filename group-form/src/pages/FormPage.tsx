import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { coefficientFor, type Submission } from '@/types/submission'

export default function FormPage() {
  const [className, setClassName] = useState('')
  const [mode, setMode] = useState<'solo' | 'group'>('group')
  const [leaderName, setLeaderName] = useState('')
  const [leaderSid, setLeaderSid] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [members, setMembers] = useState([
    { name: '', sid: '' },
    { name: '', sid: '' },
    { name: '', sid: '' },
  ])
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<Submission | null>(null)
  const [error, setError] = useState('')

  const filledMembers = members.filter((m) => m.name.trim() || m.sid.trim())
  const groupSize = mode === 'solo' ? 1 : 1 + filledMembers.length
  const coefficient = useMemo(() => coefficientFor(groupSize), [groupSize])

  const validate = (): string => {
    if (!className.trim()) return '请填写班级'
    if (!leaderName.trim()) return '请填写组长姓名'
    if (!/^\S+$/.test(leaderSid.trim())) return '请填写组长学号'
    if (!/^https?:\/\/\S+$/.test(githubUrl.trim())) return '请填写有效的 GitHub 地址（以 http:// 或 https:// 开头）'
    if (mode === 'group') {
      if (filledMembers.length < 1) return '小组作业至少填写 1 名组员（共 2-4 人）'
      for (const m of filledMembers) {
        if (!m.name.trim() || !m.sid.trim()) return '每位组员的姓名和学号都要填写完整'
      }
    }
    return ''
  }

  const submit = async () => {
    const v = validate()
    if (v) { setError(v); return }
    setError('')
    setSubmitting(true)
    const sub: Submission = {
      id: `${className.trim()}-${leaderSid.trim()}`,
      className: className.trim(),
      mode,
      leaderName: leaderName.trim(),
      leaderSid: leaderSid.trim(),
      members: mode === 'solo' ? [] : filledMembers.map((m) => ({ name: m.name.trim(), sid: m.sid.trim() })),
      githubUrl: githubUrl.trim(),
      groupSize,
      coefficient,
      createdAt: new Date().toISOString(),
    }
    try {
      const res = await fetch('./api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || '提交失败')
      setDone(sub)
    } catch (e) {
      setError('提交失败：' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">✅ 提交成功</CardTitle>
            <CardDescription>你的分组信息已确认提交，重复提交会自动覆盖更新。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-left bg-slate-100 rounded-lg p-4 text-sm space-y-1">
              <p><b>班级：</b>{done.className}</p>
              <p><b>类型：</b>{done.mode === 'solo' ? '单人作业' : `小组作业（${done.groupSize} 人）`}</p>
              <p><b>组长：</b>{done.leaderName}（{done.leaderSid}）</p>
              {done.members.map((m, i) => (
                <p key={i}><b>组员{i + 1}：</b>{m.name}（{m.sid}）</p>
              ))}
              <p><b>GitHub：</b><a href={done.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline break-all">{done.githubUrl}</a></p>
              <p><b>小组系数：</b><Badge variant="secondary">{done.coefficient}</Badge></p>
            </div>
            <Button variant="outline" onClick={() => setDone(null)}>修改并重新提交</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">作业分组确认表</CardTitle>
            <CardDescription>请由组长统一填写。单人作业按项目分直接计分；小组作业（2-4 人）成绩按项目分 × 系数折算：2 人 ×0.95，3 人 ×0.90，4 人 ×0.85，人越多系数越低，单人完成更有优势。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="className">班级 *</Label>
              <Input id="className" placeholder="例如：计科2301班" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>作业类型 *</Label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as 'solo' | 'group')} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="font-normal">单人完成</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="font-normal">小组完成（2-4 人）</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 rounded-lg border p-4 bg-white">
              <p className="font-medium text-sm">组长信息（填写人）</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="leaderName">姓名 *</Label>
                  <Input id="leaderName" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="leaderSid">学号 *</Label>
                  <Input id="leaderSid" value={leaderSid} onChange={(e) => setLeaderSid(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub 仓库地址 *</Label>
              <Input id="githubUrl" type="url" placeholder="https://github.com/用户名/仓库名" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
            </div>

            {mode === 'group' && (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-3 rounded-lg border p-4 bg-white">
                    <p className="font-medium text-sm">组员 {i + 1}{i > 0 && '（选填）'}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label>姓名{i === 0 ? ' *' : ''}</Label>
                        <Input value={members[i].name} onChange={(e) => {
                          const next = [...members]; next[i] = { ...next[i], name: e.target.value }; setMembers(next)
                        }} />
                      </div>
                      <div className="space-y-1">
                        <Label>学号{i === 0 ? ' *' : ''}</Label>
                        <Input value={members[i].sid} onChange={(e) => {
                          const next = [...members]; next[i] = { ...next[i], sid: e.target.value }; setMembers(next)
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg bg-indigo-50 border border-indigo-100 p-4">
              <div className="text-sm">
                <p className="text-slate-500">当前人数</p>
                <p className="text-xl font-bold">{groupSize} 人</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-slate-500">小组系数</p>
                <p className="text-xl font-bold text-indigo-600">×{coefficient}</p>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button className="w-full" size="lg" onClick={submit} disabled={submitting}>
              {submitting ? '提交中…' : '确认提交'}
            </Button>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-slate-400 mt-4">教师查看汇总：在链接后加 <code>/admin</code></p>
      </div>
    </div>
  )
}
