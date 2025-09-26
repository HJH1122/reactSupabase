import { CodeXml, Goal, Lightbulb, List, Rocket } from "lucide-react"

export const CLASS_CATEGORY = [
  {
    id: 1,
    label: '전체',
    category: '',
    icon: <List />
  },
    {
    id: 2,
    label: '인문학',
    category: 'humanity',
    icon: <Lightbulb />
  },
    {
    id: 3,
    label: '스타트업',
    category: 'start-up',
    icon: <Rocket />
  },
    {
    id: 4,
    label: 'IT',
    category: 'programming',
    icon: <CodeXml />
  },
    {
    id: 5,
    label: '서비스 전략 기획',
    category: 'planning',
    icon: <Goal />
  },
]