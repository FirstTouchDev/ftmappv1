import { ApprovalStatus } from "../constants/firebase";
import { Timestamp } from "firebase/firestore";
export class LineUp {

     createdBy: string;
     worshipDate: Date;
     serviceType: string;
     singers: string[];
     drummer?: string;
     bassist?: string;
     electricGuitarist1?: string;
     electricGuitarist2?: string;
     acousticGuitarist?: string;
     keyboardist1?: string;
     keyboardist2?: string;
     songTitle?: string[];
     songArtist?: string[];
     songLink?: string[];
     songAssignedSinger?: string[];
     rehearsalDateTime?: Date;
     rehearsalNotes?: string;
     status: string;
     createdAt?: Date;
     updatedAt?: Date;

     constructor(data: Partial<LineUp> = {}) {
          this.createdBy = data.createdBy || '';
          this.worshipDate = data.worshipDate ? new Date(data.worshipDate) : new Date();
          this.serviceType = data.serviceType || '';
          this.singers = data.singers || [];
          this.drummer = data.drummer || '';
          this.bassist = data.bassist || '';
          this.electricGuitarist1 = data.electricGuitarist1 || '';
          this.electricGuitarist2 = data.electricGuitarist2 || '';
          this.acousticGuitarist = data.acousticGuitarist || '';
          this.keyboardist1 = data.keyboardist1 || '';
          this.keyboardist2 = data.keyboardist2 || '';
          this.songTitle = data.songTitle || [];
          this.songArtist = data.songArtist || [];
          this.songLink = data.songLink || [];
          this.songAssignedSinger = data.songAssignedSinger || [];
          this.rehearsalDateTime = data.rehearsalDateTime ? new Date(data.rehearsalDateTime) : new Date();
          this.rehearsalNotes = data.rehearsalNotes || '';
          this.status = data.status || ApprovalStatus.WATINGFORAPPROVAL;
          this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
          this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
     }

     static fromJson(json: any): LineUp {
          return new LineUp({
               createdBy: json.createdBy,
               worshipDate: json.worshipDate instanceof Timestamp ? json.worshipDate.toDate() : new Date(json.worshipDate),
               serviceType: json.serviceType,
               singers: json.singers,
               drummer: json.drummer,
               bassist: json.bassist,
               electricGuitarist1: json.electricGuitarist1,
               electricGuitarist2: json.electricGuitarist2,
               acousticGuitarist: json.acousticGuitarist,
               keyboardist1: json.keyboardist1,
               keyboardist2: json.keyboardist2,
               songTitle: json.songTitle,
               songArtist: json.songArtist,
               songLink: json.songLink,
               songAssignedSinger: json.songAssignedSinger,
               rehearsalDateTime: json.rehearsalDateTime instanceof Timestamp ? json.rehearsalDateTime.toDate() : new Date(json.rehearsalDateTime),
               rehearsalNotes: json.rehearsalNotes,
               status: json.status,
               createdAt: json.createdAt instanceof Timestamp ? json.createdAt.toDate() : new Date(json.createdAt),
               updatedAt: json.updatedAt instanceof Timestamp ? json.updatedAt.toDate() : new Date(json.updatedAt),
          });
     }

     toJson(): object {
          return {
               createdBy: this.createdBy,
               worshipDate: this.worshipDate,
               serviceType: this.serviceType,
               singers: this.singers,
               drummer: this.drummer,
               bassist: this.bassist,
               electricGuitarist1: this.electricGuitarist1,
               electricGuitarist2: this.electricGuitarist2,
               acousticGuitarist: this.acousticGuitarist,
               keyboardist1: this.keyboardist1,
               keyboardist2: this.keyboardist2,
               songTitle: this.songTitle,
               songArtist: this.songArtist,
               songLink: this.songLink,
               songAssignedSinger: this.songAssignedSinger,
               rehearsalDateTime: this.rehearsalDateTime,
               rehearsalNotes: this.rehearsalNotes,
               status: this.status,
               createdAt: this.createdAt,
               updatedAt: this.updatedAt,
          };
     }
}
