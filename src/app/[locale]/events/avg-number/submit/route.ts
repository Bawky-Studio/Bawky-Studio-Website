import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// 타입 정의
interface Submission {
    ipHash: string; // IP 대신 해시값 저장
    youtubeId: string;
    value: number;
    time: string;
}

interface EventData {
    submissions: Submission[];
}

// 해시 함수
const SALT = "thx4testing_bawky_78f1e2a9c6b4d03"; // 환경변수로 관리 권장
function hashIp(ip: string): string {
    const normalized = ip.replace(/^::ffff:/, "");
    return crypto.createHmac("sha256", SALT).update(normalized).digest("hex");
}

export async function POST(req: NextRequest) {
    // IP 추출 (프록시 포함)
    const forwarded = req.headers.get("x-forwarded-for");
    let ip = "unknown";

    if (forwarded) {
        ip = forwarded.split(",")[0].trim();
    } else if (req.headers.get("x-real-ip")) {
        ip = req.headers.get("x-real-ip")!;
    } else if ((req as any).ip) {
        ip = (req as any).ip;
    }

    // IPv6 → IPv4 변환 (::ffff:xxx.xxx.xxx.xxx → xxx.xxx.xxx.xxx)
    ip = ip.replace(/^::ffff:/, "");

    // 해시로 변환
    const ipHash = hashIp(ip);

    const { value, youtubeId } = (await req.json()) as {
        value: number;
        youtubeId: string;
    };

    // 유효성 검사
    if (!youtubeId || !/^@[\p{L}\p{N}._-]{3,}$/u.test(youtubeId)) {
        return NextResponse.json({
            success: false,
            message: "유효한 유튜브 아이디 형식이 아닙니다.",
        });
    }

    if (typeof value !== "number" || value < 1 || value > 100000) {
        return NextResponse.json({
            success: false,
            message: "1~100000 사이의 숫자만 입력 가능합니다.",
        });
    }

    // JSON 파일 경로
    const filePath = path.join(process.cwd(), "data", "event.json");

    let eventData: EventData = { submissions: [] };

    // 기존 데이터 로드
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        eventData = JSON.parse(fileContent);
    }

    if (eventData.submissions.some((s) => s.youtubeId === youtubeId)) {
    return NextResponse.json({
        success: false,
        message: "이미 등록된 YouTube ID입니다.",
    });
	}

    // 중복 제출 방지 (해시 기준)
    if (eventData.submissions.some((s) => s.ipHash === ipHash)) {
        return NextResponse.json({
            success: false,
            message: "You've already joined..",
        });
    }

    // 새로운 제출 추가
    eventData.submissions.push({
        ipHash,
        youtubeId,
        value,
        time: new Date().toISOString(),
    });

    // 저장
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(eventData, null, 2));

    return NextResponse.json({
        success: true,
        message: "Thanks for participating!",
        data: { youtubeId, value },
    });
}
