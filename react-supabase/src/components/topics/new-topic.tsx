
import { CaseSensitive } from "lucide-react";
import { Card, Separator } from "../ui";
import type { Topic } from "@/types/topic.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어로 출력하려면
import { useNavigate } from "react-router";

dayjs.extend(relativeTime);
dayjs.locale("ko"); // 한국어로 설정

interface Props{
  props: Topic;
}

function extractTextFromContent(content: string | any[], maxChars = 200) {
    try {
        const parsed = typeof content === "string" ? JSON.parse(content) : content;

        if (!Array.isArray(parsed)) {
            console.warn("content 데이터 타입이 배열이 아닙니다.");
            return "";
        }

        let result = "";

        for (const block of parsed) {
            if (Array.isArray(block.content)) {
                for (const child of block.content) {
                    if (child?.text) {
                        result += child.text + " ";

                        if (result.length >= maxChars) {
                            return result.slice(0, maxChars) + "...";
                        }
                    }
                }
            }
        }
        return result.trim();
    } catch (error) {
        console.log("콘텐츠 파싱 실패: ", error);
        return "";
    }
}

export function NewTopicCard({props} : Props) {

  const navigate = useNavigate();

  return (
    <Card className="w-full h-fit p-4 gap-4" onClick={() => navigate(`/topics/${props.id}/detail`)}>
      <div className="flex items-start gap-4">
        <div className="flex-1 flex flex-col items-start gap-4">
            <h3 className="h-16 text-base font-semibold tracking-tight line-clamp-2">
                <CaseSensitive size={16} className="text-muted-foreground"/>
                <p>{props.title}</p>
            </h3>
            <p className="line-clamp-3 text-muted-foreground">{extractTextFromContent(props.content)}</p>
        </div>
        <img src={props.thumbnail} alt="@THUMBNAIL" className="w-[140px] h-[140px] aspect-square rounded-lg object-cover"/>
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between">
        <p>개발자 HJH</p>
        <p>{dayjs(props.created_at).format("YYYY. MM. DD")}</p>
      </div>
    </Card>
  )
}
