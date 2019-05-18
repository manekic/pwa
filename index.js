\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{hyperref}
\usepackage[croatian]{babel}
\usepackage{listings}
\usepackage{minted}
\usemintedstyle{manni}

\title{diplomski}
\author{maja.nekic25 }
\date{May 2019}

\addto\captionscroatian{
    \renewcommand*\contentsname{Sadržaj}
}


\begin{document}

\tableofcontents
\newpage

\section{Motivacija}

\begin{minted}{js}
for(var i = 0; i < 10; i++) {
    console.log("Vrijednost od i jest "+i); }
\end{minted}

\paragraph{}
Sve je započelo razvojem prvog iPhone-a 2007. godine koji je korisnicima omogućio pretraživanje web-sadržaja na mobilnom uređaju. Godinu dana kasnije pojavile su se mobilne aplikacije koje se moglo instalirati iz trgovine aplikacija (engl. app store) na mobilni uređaj. Značajkama poput napredne grafike, geolokacije, push obavijesti (engl. push notifications) i još mnogo drugih, mobilne aplikacije su postale toliko popularne da su zasjenile web. Međutim, trenutno se nalazimo u razdoblju gdje je gotovo nemoguće zamisliti život bez web-aplikacija i pristupa internetu. Ako nas zanima recept nekog jela, nakon nekoliko klikova u našem web-pregledniku ćemo ga saznati. Ako nas zanima vozni red javnog prijevoza, također je preglednik tu da nam ga „servira“. Ako želimo saznati kakvo će vrijeme biti, gdje možemo kupiti jaknu za kišu koja dolazi ili u kojem frizerskom salonu možemo osušiti kosu koju je kiša smočila, odgovarajuća web-aplikacija će nam dati sve željene odgovore. Sve to lijepo zvuči, no moramo biti svjesni činjenice da ćemo izgubiti pristup internetu svaki puta kada se vozimo u tunelu ili u liftu. Web-lokacija koju trenutno posjećujemo će nam prikazati poruku da nemamo internetsku vezu i više nećemo moći vidjeti sadržaj koji smo gledali.
\begin{figure}[h!]
 \centering
  \includegraphics[width=\textwidth]{no_connection.jpg}
  \caption{Poruka o prekidu internetske veze}
  \label{fig:prekid_veze}
\end{figure}

Naravno, internetska veza nije svuda iste jačine. Negdje je toliko slaba da će se željena web-aplikacija jedva otvarati. Otvaranje web-aplikacije može biti sporo i zbog same veličine sadržaja koji se nalazi na njoj. Ako dođemo u situaciju da nam se željeni sadržaj sporo učitava, vjerojatno ćemo tada otići sa te web-lokacije i okušati svoju sreću na nekoj drugoj. Progresivna web-aplikacija nam ne bi zadavala toliko muke. Štoviše, ona nam može ponuditi puno više od običnih web-aplikacija na koje smo navikli. Progresivne web-aplikacije su ono što su davne 2008. godine bile mobilne aplikacije – ogroman napredak mobilne tehnologije. U nastavku ovog rada, umjesto progresivne web-aplikacije, pisat cu PWA.

PWA  su moderne web-aplikacije predviđene prvenstveno za mobilne uređaje, koje se mogu usporediti s ponajboljim mobilnim aplikacijama. One objedinjuju angažman koji ostvaruju mobilne aplikacije i dohvat koji omogućuje web.
Jedne od najvažnijih odlika PWA su pouzdanost, privlačnost i brzina. Aplikacije se trenutno otvaraju te nikada ne prikazuju simbol prekida veze, čak i onda kada je internetska veza nestabilna.
\begin{figure}[h!]
 \centering
  \includegraphics[width=\textwidth]{isti_sadrzaj.png}
  \caption{PWA prikazuje isti sadržaj i bez internetske veze}
  \label{fig:isti_sadrzaj}
\end{figure}

Uslužne skripte (engl. service workers) omogućavaju trenutno pokretanje PWA, bez obzira na veličinu sadržaja aplikacije te na stanje mreže. To se postiže takozvanim predmemoriranjem (engl. caching). Predmemoriranjem ključnih resursa možemo eliminirati ovisnost o mreži i na taj način zajamčiti odaziv i pouzdan doživljaj za korisnike. PWA se mogu instalirati na korisnikov mobilni uređaj i smjestiti se na početni zaslon. Instalacija se odvija bez potrebe za trgovinom aplikacija, direktno sa web-lokacije na kojoj se ta web-aplikacija prikazuje. Manifest web-aplikacije zaslužan je za kontrolu nad izgledom aplikacije, njezinom instalacijom i pokretanjem. Možemo odrediti početni i pozdravni zaslon koji se prikazuje tijekom učitavanja aplikacije, stranicu koja će se učitati kada se aplikacija pokrene, orijetaciju zaslona i slično. Zahvaljujući push obavijestima (eng. push notifications), PWA i nakon zatvaranja ima interakciju sa korisnicima.

Pokušajmo sada na primjeru ilustrirati PWA. Zanima nas vremenska prognoza za grad Zagreb. U web-preglednik na svom mobilnom uređaju vjerojatno upišemo nešto poput „vremenska prognoza Zagreb“. Kliknemo na neku od ponuđenih web-lokacija i saznamo da će narednih dana biti sunčano. Ista informacija nas zanima i sutradan, ponovno upisujemo ključne riječi u naš web-preglednik te odabiremo jednu od ponuđenih web-lokacija. Recimo da smo odabrali neku drugu web-lokaciju koja se učitava puno duže od one koju smo jučer posjetili. Nemamo vremena dugo čekati, izlazimo sa te web-lokacije i ponovno odlazimo na onu koju smo jučer posjetili. Prognoza se nije promijenila, predviđa se sunčano vrijeme. No, uz vremensku prognozu, danas nam preglednik nudi mogućnost instaliranja aplikacije na naš mobilni uređaj. Klikom na odgovarajuću opciju, aplikacija se instalira i smješta na naš početni zaslon. Sljedeći put kad želimo saznati vremensku prognozu samo otvorimo aplikaciju na našem mobilnom uređaju. Također, aplikacija nas tada pita želimo li primati obavijesti o promjeni vremenske prognoze. Na to pitanje odogovorimo potvrdno, proučimo prognozu, vidimo da nas opet očekuje sunčano vrijeme i zatvorimo aplikaciju. Sljedeće jutro smo pripremili da ćemo za posao obući kratke rukave, no aplikacija nam šalje obavijest da postoji mogućnost lokalnih pljuskova. U zadnji tren uzimamo kišobran i jaknu te izlazimo iz stana. Popodne je, kako nam je aplikacija i javila, počela padati kiša. Sva sreća da smo instalirali aplikaciju na mobilni uređaj.

Iz ovog malog primjera vidimo koliko prednosti progresivne web-aplikacije imaju ispred web-aplikacija. Analizirajmo prethodni primjer malo detaljnije. Web-preglednik nam uvijek ponudi pregršt opcija koje odgovaraju našim zahtjevima pretraživanja. Dakle, svaki puta možemo posjetiti drugu web-lokaciju da bismo saznali infomaciju koja nas zanima. Web-stranice žele privući i zadržati korisnike, a to može biti otežano jer, na primjer, čim se stranica učitava dulje nego što smo predvidjeli, mi je napuštamo i odabiremo neku drugu. Instalacijom aplikacije na mobilni uređaj, dotična web-lokacija osigurava da će korisnici ponovno koristiti tu aplikaciju (u suprotnom, zašto bi je uopće instalirali?!). Instalacija je jednostavnija nego ikada jer ne zahtijeva odlazak u trgovinu aplikacija, već se sve događa na web-stranici koju trenutno posjećujemo. Pružanjem push obavijesti aplikacija razvija interakciju sa korisnicima te im javlja infomacije koje ih zanimaju. Jedva od važnijih činjenica jest ta da se aplikacija svaki puta trenutno otvara, bez obzira na stanje mreže. Sve navedeno osigurava da web-aplikacija zadrži svoje (zadovoljne) korisnike.

Temeljni dio svake PWA je uslužna skripta. Prije uslužnih skripti, kôd web-aplikacija se izvodio ili na poslužitelju ili u prozoru preglednika. Uslužna skripta je skripta koja se može registrirati za upravljanje jednom ili više stranica naše web-lokacije. Jednom kada je instalirana, uslužna skripta se smješta izvan svakog prozora ili kartice preglednika. Dakle, postoji sloj između web-poslužitelja i web-stranice koji odgovara na zahtjeve neovisno o mrežnoj vezi.

\begin{figure}[h]
 \centering
  \includegraphics[width=\textwidth]{progressive-web-applications-01.jpg}
  \caption{Web-aplikacije vs. PWA}
  \label{fig:wa_vs_pwa}
\end{figure}

Uslužna skripta može osluškivati i djelovati na događaje sa svih stranica koje su pod njezinom kontrolom. Ona otkriva izvanmrežno stanje ili spori odgovor poslužitelja te vraća sadržaj iz predmemorije (engl. cache). Također, nakon zatvaranja aplikacije, uslužna skripta i dalje komunicira sa poslužiteljem te je zadužena za pružanje push obavijesti i osigurava da sve radnje koje je korisnik napravio budu dostavljene poslužitelju (na primjer, spremanje podataka u bazu podataka i slično).

\begin{figure}[h!]
 \centering
  \includegraphics[width=\textwidth]{sw.jpg}
  \caption{Uslužna skripta}
  \label{fig:usluzna_skripta}
\end{figure}

\section{Uvod}
\paragraph{}
U ovom radu demonstrirat ćemo kako web-aplikaciju preoblikovati tako da ona postane progresivna. Svaki korak u toj preobrazbi ćemo detaljno prikazati i objasniti te potkrijepiti infromacijama koje su važne za dotični dio sa teorijskog stajališta. Objasnit ćemo ulogu manifesta te detaljno obraditi uslužne skripte na koje je već dan osvrt. Upoznat ćemo se sa lokalnom bazom podataka, točnije sa IndexedDB, obavijestima, push obavijestima te pozadinskom sinkronizacijom (engl. background sync).
Koristimo se Google Chrome-om za razvoj PWA. Alati za razvojne programere (Crlt + Shift + I) sadrže tri kartice koje će nam biti od velike pomoći. Radi se o Console, Network i Application. Sve pomoćne poruke koje ispisujemo tijekom razvijanja aplikacije biti će nam prikazane u Console i to nam uvelike olakšava debbugiranje. Komunikaciju klijentskih i serverskih skripti možemo pratiti u Network-u (zahtijeve klijenta i odgovore servera). U Application se nalaze kartice potrebne za razvoj PWA od kojih ćemo se mi koristiti sljedećima: Manifest, Service Workers, Session Storage, IndexedDB te Cache Storage. Service Workers nam nudi tri mogućnosti: Offline, Update on reload i Bypass for network. Kada želimo vidjeti kako naša aplikacija radi bez internetske veze, označiti ćemo Offline. Također, kako bismo bili sigurni da uvijek koristimo ažurnu verziju uslužne skripte, prilikom razvoja PWA cijelo vrijeme ćemo imati označenu opciju Update on reload.

\begin{figure}[h]
 \centering
  \includegraphics[width=\textwidth]{chrome.png}
  \caption{Alati za razvojne programere}
  \label{fig:developer_tools}
\end{figure}

\subsection{Upoznavanje sa početnom aplikacijom}
\paragraph{}
Aplikacija od koje ćemo krenuti je web-aplikacija namjenjena studentima za praćenje rezultata na ispitima. Web-aplikacija se sastoji od kljentskog i serverskog dijela. Klijentski dio je pisan u JavaScript jeziku, dok je serverski pisan u PHP jeziku. Oni komuniciraju pomoću Ajax upita koristeći GET metodu. Pri svakom Ajax upitu koji je došao od strane klijenta, server se spaja na bazu Studenti te izvodi potrebe radnje. Kao odgovor se šalje ili prikladna poruka (na primjer, poruka o razlogu zbog kojeg prijava studenta u aplikaciju nije uspjela) ili traženi podaci (na primjer, identifikacijski broj studenta).

Klijentski dio web-aplikacije sastoji se od skripti koje se prikazuju korisnicima. Dakle, to su skripte kojima je implementirana početna stranica za prijavu (\textit{index.html}), stranica na kojoj se studentima prikazuju rezultati (\textit{rezultati.html}), početna stranica koja se prikazuje administratoru (\textit{administrator.html}) i slično. Serverska strana sastoji se od skripti implementiranih za rad sa bazom. Neke od njih su: \textit{rezultati.php}, \textit{administrator.php}, \textit{index.php} i ostale. Iz navedenog je vidljivo da skripte klijentske strane imaju ekstenziju \textit{.html}, a one serverske strane \textit{.php}. Kako svaka skripta servirana klijentu zahtijeva neke podatke iz baze, očito uvijek mora postojati odgovarajuća serverska skripta koja iste podatke dohvaća.
Sve varijable važne za uredno funcioniranje web-aplikacije se spremaju u Session Storage. Prilikom svake uspješne prijave, identifikacijski broj korisnika se pohranjuje u spomenuti spremnik. Ako je korisnik student, njegov identifikacijski broj jedak je atributu \textit{student\_id} iz tablice \textit{studenti}. S druge strane, ako je korisnik administrator, u Session Storage se upisuje varijabla sa vrijednosti 0.

Korisnici imaju mogućnost odjaviti se iz aplikacije. Ukoliko se odluče na odjavu, svi podaci koji su spremljeni u Session Storage se brišu. Posebno, briše se i varijabla koja označava identifikacijski broj korisnika. Ako korisnici napuste aplikaciju bez odjave, podaci u Session Storage-u ostaju spremljeni te, na temelju vrijednosti varijable u koju je upisan identifikacijski broj, aplikacija razlikuje studente od administratora. Razlikovati „vrstu“ korisnika je važno zato što nakon otvaranja aplikacije sadržaj koji treba biti vidljiv studentima nije jednak sadržaju koji se prikazuje administratoru.

\begin{figure}[h]
 \centering
  \includegraphics[width=\textwidth]{rezultati.png}
  \caption{Sadržaj vidljiv studentima u aplikaciji}
  \label{fig:rezultati}
\end{figure}

\begin{figure}[h]
 \centering
  \includegraphics[width=\textwidth]{admin_pocetna.png}
  \caption{Početna stranica vidljiva administratoru u aplikaciji}
  \label{fig:admin_pocetna}
\end{figure}

Prilikom upisa prve akademske godine na željenom fakultetu svakom studentu se dodijeli jedinstvneni matični broj akademskog građana (JMBAG) te lozinka. Pomoću ta dva podatka studenti se prijavljuju u spomenutu web-aplikaciju. Dakle, kao korisničko ime koriste JMBAG, a ako lozniku koriste lozinku koja im je dodijeljena.

\begin{figure}[h]
 \centering
  \includegraphics[width=\textwidth]{prijava.png}
  \caption{Prijava u aplikaciju}
  \label{fig:prijava}
\end{figure}

Slijedi komunikacija klijenta i servera u kojoj server provjerava točnost podataka koje mu je klijent poslao. Ako je sve u redu, prijava je uspjela te server kao odgovor šalje rezultate i identifikacijski broj korisnika koji se prijavio. Identifikacijski broj se sprema u Session Storage. Studentu se sada prikaže popis svih upisanih kolegija te bodovi iz pojedinih elemenata ocjenjivanja. Inače, ako server nije uspio u bazi pronaći odgovarajući par podataka, kao odgovor šalje poruku koja sadrži informacije o greški. Poruka se prikazuje korisniku kao upozorenje (na primjer, nepostojeće korisničko ime, pogrešna lozinka ili slično). Studenti imaju na izbor žele li se odjaviti prije napuštanja web-aplikacije ili žele ostati prijavljeni u istu. Ako se odjave, podaci iz Session Storage-a se brišu (obriše se identifikacijski broj studneta koji se prijavio) te je sljedeći put prilikom otvaranja web-aplikacije potreba prijava. S druge strane, ako se ne odjave, prilikom otvaranja web-aplikacija za spremljeni identifikacijski broj iz Session Storage-a dohvati od servera rezultate. Studenti se automatski preusmjeravaju na stranicu sa njihovim rezultatima.

Baza podataka korištena za ovu web-aplikaciju naziva se \textit{Studenti}. \textit{Studenti} se sastoji od 3 glavne tablice: \textit{studenti}, \textit{kolegiji} te \textit{rezultati}. Tablica \textit{studenti} sadrži sve važne podatke o svim studentima te ima sljedeće atribute: \textit{student\_id} (primarni ključ), \textit{username}, \textit{password}, \textit{ime}, \textit{prezime}. Tablica \textit{kolegiji} se sastoji od popisa kolegija koji su dostupni na fakultetu te sadrži atribute \textit{kolegij\_id} (primarni ključ) i \textit{naziv\_kolegija}. Vidimo da su \textit{student\_id} i \textit{kolegij\_id} jedinstveni identifikatori za svakog studenta, odnosno za svaki kolegij. Posljednja tablica, \textit{rezultati}, se sastoji od parova id-a studenta i id-a kolegija te broja bodova za svaki od postojećih elemenata ocjenjivanja. Dakle, atributi su: \textit{studenti\_id}, \textit{kolegij\_id}, \textit{1kolokvij}, \textit{2kolokvij}, \textit{zavrsni}, \textit{1zadaca}, \textit{2zadaca}, \textit{3zadaca} i \textit{4zadaca}. Primjećujemo da parovi \textit{student\_id} i \textit{kolegij\_id} nisu jedinstveni!

Navedena baza se kreira na \textit{phpMyAdmin} stranici pokretanjem skripte \textit{prepareDB.php}.

Administrator ima posebno korisničko ime i lozniku te, za razliku od studenata, on ima na raspolaganju druge funkcionalnosti. Sve funkcionalnosti navodim u nastavku i dajem za svaku kratki opis.

1.	Upis bodova: server klijentu šalje popis svih kolegija te administrator može odabrati za koji kolegij želi studentima upisat nove bodove. Odabirom naziva kolegija, Ajax upitom se dohvaća popis svih studenata i elemenata ocjenjivanja, sa već postojećim rezultatima. Isti popis se prikazuje te se pruža mogućnost upisa novih bodova. Reakcija na događaj pritiska tipke Enter Ajax upitom šalje sve potrebne podatke serveru koje isti sprema u bazu podataka i time ažurira tablicu rezultati.

2.	Brisanje upisanih kolegija: Ajax-om se dohavati popis svih studenata te se prikaže administratoru. On odabire studenta kojemu iz baze želi obrisati kolegije upisane prethodnih akademskig godina. Odabirom studenta, Ajax-om se dobiva popis kolegija dotičnog studenta. Nakon odabira željenog predmeta, serverskoj strani aplikacije se šalju potrebni podaci te ona ažurira bazu podataka, točnije tablicu rezultati tako da obriše jedan redak te tablice (onaj koji je jednoznačno određen poslanim podacima).

3.	Unos novih studenata: na početku svake akademske godine administrator upisuje studente koji su upisali 1.godinu fakulteta u bazu. Klijentska strana serverskoj šalje podatke u studentu koji se upisuju u bazi podataka u tablicu studenti.

4.	Upis novih kolegija: administrator ima mogućnost upisivati nove kolegije studentima koji se nalaze u bazi. Odabirom te opcije, serverska strana klijentskoj šalje popis svih studenata. Administrator sa tog popisa odabire studenta kojemu želi upisati nove kolegije i podaci o odabiru studenta se šalju serveru. Nakon toga kao odgovor stiže popih svih kolegija te administrator odabire koje kolegije će upisat dotičnom studentu. Označavanjem kolegija, automatski se u tablicu rezultati dodaje novi redak sa odgovarajućim podacima. Odznačavanjem već označenog kolegija iz tablice rezultati se briše redak koji ima odgovarajuće podatke.

\section{Uslužne skripte}
\subsection{Životni ciklus uslužne skripte}
\paragraph{}
Za pravilno korištenje uslužnih skripti važno je razumjeti njihov životni ciklus koji se, uglavnom, sastoji od tri važne faze: registracije, instalacije i aktivacije.
\subsubsection{Registracija}
\paragraph{}
Uslužne skripte su JavaScript skripte koje reagiraju na događaje, a „rade“ u pozadini aplikacije kao dodatni komunikacijski sloj između mreže (web-poslužitelja) i web-aplikacije. U svom pozadinskom radu, one presijecaju mrežne zahtijeve te trajno pohranjuju (predmemoriraju) podatke. Na taj način omogućen je izvanmrežni rad. Prije nego što možemo početi sa korištenjem uslužne skripte, moramo je registrirati kao pozadinski proces.
Kako bismo napravili svoju prvu uslužnu skriptu, potrebene su dvije nove skripte unutar naše aplikacije. U korijenski direktorij smjestimo skriptu sw.js, a skriptu app.js možemo smjestiti bilo gdje unutar direktorija. Važno je da je uslužna skripta smještena u korijenskom direktoriju jer ona kontrolira sav „promet“ unutar aplikacije.
\\\textit{app.js} se sastoji od sljedećeg koda koji je namijenjen registraciji uslužne skripte.

\begin{minted}{js}
if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("Service Worker registered with scope:", registration.scope);
  }).catch(function(err) {
    console.log("Service Worker registration failed:", err);
  });
}
\end{minted}

Započinje se provjerom podržava li preglednik uslužne skripte (\textit{navigator.serviceWorker}). Ako podržava, uslužna skripta se registrira i navedeni dio koda vraća obećanje (engl. promise) koje se rješava nakon uspješne registracije uslužne skripte.

\subsubsection{Instalacija}
\paragraph{}
Činjenica da je uslužna skripta registrirana ne znači da je ona i instalirana u našoj aplikaciji. Zbog toga nakon registracije slijedi faza instalacije uslužne skripte. Nakon uspješne registracije, skripta se preuzima i preglednik je pokušava instalirati pomoću sljedećeg koda.

\begin{minted}{js}
self.addEventListener("install", function(event) {
  console.log('Service Worker installed');
});
\end{minted}

Instalacija će se dogoditi samo ako uslužna skripta još nije registrirana (za svaku uslužnu skriptu, instalacija se događa samo jednom).

Kako uslužne skripte reagiraju na događaje, jasno je da se u \textit{sw.js} skriptu dodaje novi događaj \textit{install} koji pokreće instalaciju. Pomoću ovog događaja možemo obaviti neke zadatke specifične za aplikaciju (na primjer, predmemoriranje svih sadržaja koje želimo spremiti u predmemoriju te ih koristiti čak i onda kada nemamo internetsku vezu). No, više o tome malo kasnije.

\subsubsection{Aktivacija}
\paragraph{}
Ako je instalacija uspjela, uslužna skripta ulazi u stanje \textit{installed} tijekom kojeg čeka na preuzimanje kontrole nad aplikacijom od trenutne uslužne skripte. Na red dolazi faza aktivacije uslužne skripte.

Uslužna skripta se ne aktivira odmah nakon instalacije. Do aktivacije će doći samo ako trenutno nema aktivne uslužne skripte ili ako korisnik osvježi web-stranicu.

\begin{minted}{js}
self.addEventListener("activate", function(event) {
  console.log('Service Worker activated');
});
\end{minted}

Poput događaja instalacije, i događaj aktivacije može u sebi sadržavati neke specifične radnje vezane uz aplikaciju (na primjer, možemo obrisati sadržaj predmemorije). Jednom kada je uslužna skripta aktivirana, ona ima poputnu kontrolu nad aplikacijom te može upravljati raznim događajima poput \textit{fetch}, \textit{push} i \textit{sync}.

\vspace{5mm}
U slučaju da aktivna uslužna skripta ne primi niti jedan od gore navedenih događaja, ona prelazi u stanje mirovanja (engl. idle state). Nakon što je neko vrijeme u stanju mirovanja, skripta prelazi u prekinuto stanje (engl. terminated state). Prekinuto stanje ne znači da je uslužna skripta deinstalirana ili odjavljena (engl. unregistrated). Štoviše, ona će ponovno prijeći u stanje mirovanja čim krene primati funkcijske događaje (\textit{fetch}, \textit{push} ili \textit{sync}).

\begin{figure}[h]
 \centering
  \includegraphics[width=\textwidth]{stanja.png}
  \caption{Životni ciklus uslužne skripte}
  \label{fig:stanja_sw}
\end{figure}

\subsection{HTTPS i uslužne skripte}
\paragraph{}
S obzirom na to da uslužne skripte presreću sve zahtjeve, uvijek postoji mogućnost prisustva zlonamjerne treće strane koja bi mogla oštetiti našeg korisnika. Upravo zbog toga samo stranice koje se poslužuju preko sigurnih veza (HTTPS) mogu registrirati uslužne skripte.
Tijekom razvoja PWA, uslužne skripte možemo koristiti na našem lokalnom poslužitelju (localhost), ali nakon implementacije web-aplikacije potrebno ju je postaviti na poslužitelj koji poslužuje preko sigurne veze HTTPS.

\section{Predmemoriranje}
\paragraph{}
Kako bismo omogućili rad web-aplikacije čak i u uvjetima gdje nema internetske veze, potrebno je predmemoriranje sadržaja. Za predmemoriranje koristimo \textit{CacheStorage API}.

CacheStorage je novi sloj predmemoriranja koji u potpunosti možemo kontrolirati. Možemo odlučiti što želimo spremiti u predmemoriju, što i kada želimo obrisati iz iste te na koji način odgovaramo zahtjevima iz preglednika (vraćajući traženo iz predmemorije ili sa mreže).

Postavlja se pitanje kada predmemorirati sadržaj. Već je spomenuto da se ta radnja može obaviti tijekom instalacije uslužne skripte, to jest, unutar \textit{install} događaja. Kako se taj događaj dogodi samo jednom u životnom ciklusu uslužne skripte, i naše predmemoriranje će se obaviti samo jednom. Također, ako nešto sa predmemoriranjem pođe po krivu, uvijek imamo mogućnost otkazati instalaciju uslužne skripte. Ako dođe do prekida instalacije, preglednik će ponovno pokušati pokrenuti instalaciju sljedeći put kada korisnik posjeti stranicu. Predmemoriranjem unutar \textit{install} događaja osigurali smo da se pohrane sve potrebne datoteke prije nego što se smatra da je uslužna skripta instalirana i aktivna.

\subsection{Uobičajeni obrasci spremanja}
\paragraph{}
Različiti obrasci spremanja odgovaraju različitim situacijama i zahtjevima. Primjerice, ako radimo aplikaciju za prognozu vremena, logično je da želimo koristiti obrazac koji uvijek prvo pokuša dohvatiti najnovije informacije o vremenu sa mreže, a, samo ako to dohvaćanje ne uspije, poseže se za već spremljenim informacijama u predmomoriju.

Uslužne skripte presreću sve zahtjeve za resursima pomoću \textit{fetch} događaja. Dakle, kada preglednik zatraži neki resurs, uslužna skripta, osluškivajući \textit{fetch} događaje, odgovara traženim resursom (ako takav postoji).

U nastavku slijedi nekoliko uobičajenih obrazaca predmemoriranja.

\subsubsection{Samo predmemorija}
\paragraph{}
Na sve zatjeve za resursima se odgovara datotekama iz predmemorije. Ako traženi resurs nije pronađen u predmemoriji, zahtjev ne uspijeva. Ovaj obrazac pretpostavlja da je resurs pohranjen u predmemoriju nekad prije (vjerojatno tijekom instalacije uslužne skripte).

\begin{minted}{js}
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});
\end{minted}

Obrazac je pogodan za statičke resurse koji se ne mijenjaju često. Primjerice, ikone, logotipi i slično.

\subsubsection{Predmemorija, posezanje na mrežu}
\paragraph{}
Slično kao i gore, ovaj obrazac odgovara zahtjevima sadržajem iz predmemorije. No, ako traženi sadržaj nije pronađen, uslužna skripta ga pokušava pronaći na mreži.

\begin{minted}{js}
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  );
});
\end{minted}

\subsubsection{Samo mreža}
\paragraph{}
Ovo je klasični model weba gdje se zahtjevi pokušavaju dohvatiti sa mreže. Ako dohvaćanje ne uspije, zahtjev ne uspijeva. Obrazac je dobar za sadržaje koje za koje odlučimo da ih ne želimo predmemorirati.

\begin{minted}{js}
self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request)
  );
});
\end{minted}

\subsubsection{Mreža, posezanje u predmemoriju}
\paragraph{}
Zahtjevi se uvijek pokušaju dohvatiti sa mreže. Ako dohvaćanje ne uspije, traženi resurs se pokuša pronaći u predmemoriji. Ako resurs nije pronađen ni tada, zahtjev ne uspijeva.

\begin{minted}{js}
self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
\end{minted}

\vspace{5mm}
Uz sve spomenute obrasce, postoje i razne verzije koje uključuju modifikacije istih. Slijede neke mogućnosti.

\subsubsection{Predmemorija, posezanje na mrežu sa čestim ažuriranjima}
\paragraph{}
Za resurse koji se mijenjaju s vremena na vrijeme, ali je prikazivanje njihove najnovije verzije manje važno od brzine samog odgovora, možemo modificirati obrazac \textit{predmemorija, posezanje na mrežu}. Brzi odgovor na zahtjev za resurs dobiva se iz predmemorije, a u pozadini se poseže na mrežu kako bi se dohvatila najnovija verzija resursa i pohranila u predmemoriju. Sve promjene resursa dohvaćenog sa mreže biti će dostupne sljedeći put kada korisnik zatraži taj resurs.

\begin{minted}{js}
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.open("cache-name").then(function(cache) {
      return cache.match(event.request).then(function(cachedResponse) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    })
  );
});
\end{minted}

\subsubsection{Mreža, posezanje u predmemoriju sa čestim ažuriranjima}
\paragraph{}
Kada je važno uvijek dohvatiti najnovije verzije dostupnih resursa, modificiramo obrazac \textit{mreža, posezanje u predmemoriju}. Ovaj obrazac uvijek pokušava dohvatiti najnoviju verziju traženog resursa sa mreže te, ako ne uspije, u predmemoriji potraži spremljenu verziju. Dodatno, svaki puta kada se resurs uspješno dohvati sa mreže, predmemorija se ažurira sa mrežnim odgovorom.

\begin{minted}{js}
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.open("cache-name").then(function(cache) {
      return fetch(event.request).then(function(cachedResponse) {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      }).catch(function() {
        return caches.match(event.request);
      });
    })
  );
});
\end{minted}

\subsection{Planiranje strategije za predmemoriranje u našoj aplikaciji}
\paragraph{}
Želimo li omogućiti svojim korisnicima izvanmrežni rad, potrebno je predmemorirati sve resurse. Kako bismo korisnicima pružili najbolju moguću uslugu, trebamo analizirati od kakvih se sve resursa sastoji naša web-aplikacija te, u skladu sa time, odabrati najpogodnije obrasce za predmemoriranje istih.

Sve stranice naše aplikacije imaju statičke dijelove – slike, datoteke i poveznice koje određuju izgled aplikacije. Kako se navedeni dijelovi rijetko mijenjaju (ili čak nikada), za njihovo predmemoriranje koristimo obrazac \textit{predmemorija, posezanje na mrežu}.

Što se tiče ostatka sadržaja aplikacije, većinom su to datoteke (skripte) koje se ne mijenjaju često između različitih verzija. Zaključujemo da bismo kod njihovog predmemoriranja mogli koristiti isti obrazac. No, u ovom trenutku nam se javlja veliki problem. Ako se datoteke promijene, morat ćemo promijeniti i uslužnu skriptu kako bismo osigurali da se našim korisnicima prikazuje najnovija verzija stranice. Razmatramo li slučaj dalje, stvari postaju jos gore. Naime, sve dok prva uslužna skripta ne prepusti kontrolu drugoj (novoj), korisnicima će se prikazivati stara verzija stranice. Druga uslužna skripta će preuzeti kontrolu nad stranicom tek kada korisnik drugi puta posjeti našu aplikaciju. Upravo zbog toga, odbacujemo \textit{predmemorija, posezanje na mrežu} obrazac te imamo sljedeća dva moguća slučaja:

1.	Posluživanje datoteka obrascem \textit{mreža, posezanje u predmemoriju}. Korisnicima će se uvijek prikazivati najnovije verzije stranica, no propuštamo priliku da ubrzamo učitavanje stranice dohvaćanjem iste iz predmemorije, ako ona tamo postoji.

2.	Posluživanje datoteka obrascem \textit{predmemorija, posezanje na mrežu sa čestim ažuriranjima}.  Ova opcija uvijek poslužuje datoteke iz predmemorije, no istovremeno provjerava postoji li novija verzija istih te ažurira predmemoriju ako postoji. Dakle, dobivamo vrlo brzi odgovor, ali korisnicima se možda neće učitati najnovija verzija stranice. Doduše, to nije toliko veliki problem jer će sljedećim učitavanjem biti prikazana najnovija verzija (nije potrebno ažurirati uslužnu skriptu).

Aplikacija uvijek mora prikazati najnoviju verziju stranice \textit{rezultati.html}. Dakle, puno važnija je točnost podataka nego brzina. Stoga se odlučujemo za prvu opciju posluživanja.  Iz razloga što se ostale datoteke rijetko mijenjaju, njih poslužujemo pomoću  druge opcije.

\subsection{Impelementacija uslužne skripte}
\paragraph{}
Do sada smo u našu aplikaciju dodali implementiranu skriptu \textit{app.js}, a \textit{sw.js} smo samo kreirali. Sada ćemo toj skripti dodati potrebni kod.

Prvo trebamo navesti sve datoteke koje želimo predmemorirati i dodati \textit{install} događaj unutar kojega se odvija predmemoriranje.

\begin{minted}{js}
var CACHE_NAME = "PWA-cache";
var CACHED_URLS = [
  "index.html",
  "view.css",
  "6.jpg",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css",
  "app.js",
  "administrator.html",
  //...
];

self.addEventListener("install", function(event) {
  console.log( 'sw.install' );
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  )
});
\end{minted}

Varijabla \textit{CACHED\_URLS} ne sadrži cijeli popis datoteka jer je poprilično dug pa je navedena samo nekolicina radi ilustracije.

Zbog toga što dohvaćamo i pohranjujemo datoteke asinkrono, želimo odgoditi \textit{install} događaj sve dok asinkroni događaj \textit{fetch} nije završio. Funkcija \textit{waitUntil} nam to omogućava. Sljedećim pseudokodom ćemo opisati što zapravo ta funkcija radi.

\begin{minted}{python}
ako je otkriven dogadaj instalacije,
nemoj ga proglasiti uspjesnim sve dok:
  uspjesno otvori predmemoriju
    onda
  uspjesno dohvati datoteke i spremi ih u predmemoriju
ako neki od ovih koraka ne uspije,
prekini instalaciju usluzne skripte
\end{minted}

\textit{waitUntil} produlji trajanje \textit{install} događaja sve dok se ne obećanje koje smo proslijedili ne razriješi. To nam omogućava da čekamo sve dok uspješno ne pohranimo datoteke u predmemoriju prije proglašenja \textit{install} događaja završenim. Također, dobivamo mogućnost prekinuti instalaciju ako je u bilo kojem koraku došlo do odbijanja obećanja. Unutar \textit{waitUntil} pozivamo \textit{caches.open} i proslijeđujemo ime naše predmemorije. \textit{caches.open} ili otvori i vrati postojeću predmemoriju, ili, ako predmemorija sa danim imenom ne postoji, stvara predmemoriju danog imena i varaća je. Objekt koji se vraća je ponovno obećanje te zato nastavljamo sa \textit{then} izjavom.

Nakon što se uslužna skripta instalira te je spremna postati aktivna i zamijeniti staru aktivnu skriptu, slijedi događaj \textit{activate} koji uzrokuje aktivaciju iste te skripte. U tom trenutnu, sve datoteke koje se zahtijevaju su uspješno pohranjene u predmemoriju. No, prije nego što proglasimo uslužnu skriptu aktivnom, želimo obrisati stare predmemorije koje su koristile stare uslužne skripte.

\begin{minted}{js}
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(CACHE_NAME !== cacheName && cacheName.startsWith("PWA-cache")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
\end{minted}

Kod započinje sa produljivanjem događaja pomoću \textit{waitUntil} funkcije. To znači da, kako bi završila svoju aktivaciju,  uslužna skripta mora čekati sve dok ne obrišemo sve stare predmemorije. Tu radnju napravimo proslijeđujući obećanje funckiji \textit{waitUntil}. Pomoću \textit{caches.keys()} dobijemo niz koji sadrži imena svih predmemorija stvorenih u našoj aplikaciji. Iteracijom po tom nizu brišemo samo one predmemorije koje zadovoljavaju oba uvjeta: njihovo ime se razlikuje od imena aktivne predmemorije te njihovo ime započinje sa \textit{PWA-cache}.

Razmotrili smo razne strategije predmemoriranja i dohvaćanja datoteka. Na redu je implementacija istog. Također, zbog duljine koda, navodim samo dio. Ostatak je analogan.

\begin{minted}{js}
self.addEventListener("fetch", function (event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === "/~maja/pwa/index.html" ) {
    console.log("/~maja/pwa/index.html");
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("index.html").then(function(cachedResponse) {
          var fetchPromise = fetch("index.html").then(function(networkResponse) {
            cache.put("index.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/administrator.html") {
    console.log("/~maja/pwa/administrator.html");
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("administrator.html").then(function(cachedResponse) {
          var fetchPromise = fetch("administrator.html").then(function(networkResponse) {
            cache.put("administrator.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/rezultati.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  } else if (requestURL.pathname.startsWith("6")) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});
\end{minted}

\section{Lokalno spremanje podataka}
\paragraph{}
Sve skripte koje koristi naša aplikacija smo spremili u predmemoriju te ih, neovisno o mreži, možemo otvoriti bez da nam preglednik prikaže poruku o prekidu internetske veze. Međutim, iako smo, na primjer, osigurali da studenti mogu otvoriti stranicu \textit{rezultati.html} kada nemaju pristup internetu, nismo osigurali da se na istoj stranici zaista prikažu odgovarajući rezultati studenata. Razlog tome je taj što se aplikacija za svaku manipulaciju podacima (u ovom slučaju radi se o dohvaćanju rezultata) oslanja na Ajax upite upućene serveru. Da bismo postigli neovisnost od servera u aplikaciji, potrebno je lokalno spremiti rezultate studenata. Postoji nekoliko lokalnih spremnika podataka, a mi ćemo se upoznati sa \textit{IndexedDB}.

\subsection{Općenito u IndexedDB}
\paragraph{}
IndexedDB je transakcijska, indeksirana i objektno orijentirana baza podataka u pregledniku. Objasnimo redom značenje svakog od navedenih pojmova u ovoj definiciji.
\begin{itemize}
\item\textit{IndexedDB je transakcijska}: sve manipulacije ovom bazom podataka su grupirane u transakcije. To znači da će ili sve akcije uspjeti ili niti jedna akcija neće uspjeti. Primjerice, recimo da imamo bazu podataka koja sprema podatke o stanju računa svojih korisnika. Želimo Ivanu oduzeti 200 kuna sa računa te ih uplatiti na Markov račun. To su dvije odvojene akcije koje moramo napraviti u bazi podataka. Dakle, moramo od Ivana oduzeti 200 kuna te Marku dodati 200 kuna na račun. Imamo dvije mogućnosti za neuspjeh.
\item\textit{IndexedDB je transakcijska}: sve manipulacije ovom bazom podataka su grupirane u transakcije. To znači da će ili sve akcije uspjeti ili niti jedna akcija neće uspjeti.
Primjerice, recimo da imamo bazu podataka koja sprema podatke o stanju računa svojih korisnika. Želimo Ivanu oduzeti 200 kuna sa računa te ih uplatiti na Markov račun. To su dvije odvojene akcije koje moramo napraviti u bazi podataka. Dakle, moramo od Ivana oduzeti 200 kuna te Marku dodati 200 kuna na račun. Imamo dvije mogućnosti za neuspjeh.
\begin{enumerate}
\item  Prva akcija nije uspjela jer Ivan na računu ima samo 50 kuna, a druga akcija je uspješna. Očito smo banku oštetili za 200 kuna koje smo dodali Marku.
\item  Prva akcija je uspjela i Ivanu smo oduzeli 200 kuna, no Markov račun je zamrznut i ne možemo mu dodati željenu svotu. Sada smo Ivana oštetili za 200 kuna koje više ne postoje. \end{enumerate}

U indexedDB takvih problema nema jer se akcije grupiraju u transakcije. Time postižemo da su sve akcije ili uspjele ili niti jedna od njih nije uspjela.
\item\textit{IndexedDB je objektno orijentirana}: za razliku od relacijski baza podataka (primjerice, MySQL) koje se sastoje od tablica sa unaprijed definiranim stupcima, objektno orijentirana baza podataka pohranjuje objekte. Svaka baza može sadržavati više spremišta objekata (engl. object store) i svaki od njih može sadržavati više objekata.
Baza podataka za prethodni primjer, sa Markom i Ivanom, može, primjerice, sadržavati spremište objekata za članove banke. Unutar tog spremišta svakog člana predstavlja jedan objekt koji se sastoji od imena i prezimena člana, stanja njegovog računa i slično.
\item\textit{IndexedDB je indeksirana}: poput tradicionalnih relakcijski baza podataka, i IndexedDB koristi indekse. Svakom spremištu objekata možemo dodati indeks koji koristimo za dohvaćanje željenih objekata.

U dosad spomenutom primjeru, za spremište objekata koje sadrži članove banke, kao indeks možemo koristiti prezime člana (pod pretpostavkom da se postoji višr članova sa istim prezimenom).
\item\textit{IndexedDB je baza podataka u pregledniku}: IndexedDB je potpunosti smještena u pregledniku. Bilo koji podatak pohranjen u toj bazi možemo dohvatiti neovisno o stanju mreže.
Sve radnje vezane uz IndexedDB pisane su JavaScript jezikom. Objekti koji se pohranjuju mogu biti JavaScript objekti, brojevi, stringovi, polja, regularni izrazi, null vrijednosti i slično.
\end{itemize}

\subsection{Sintaksa IndexedDB}
\paragraph{}
Za početak ćemo se upoznati sa nekim akcijama koje se mogu izvoditi u IndexedDB.
\subsubsection{Otvaranje baze podataka}

\begin{minted}{js}
var request = window.indexedDB.open("new-db", 1);
request.onerror = function(event) {
  console.log("DB Error " + event.target.error);
};
request.onsuccess = function(event) {
  db = event.target.result;
  console.log("DB: " + db);
}
\end{minted}

\textit{windows.indexedDB.open} vraća zahtijev za otvaranje komunikacije sa bazom. Osluškuju se događaji \textit{success} i \textit{error} vezani uz taj zahtijev.

Ukoliko \textit{new-db} ne postoji, čim pokrenemo ovaj kod, u pregledniku će se stvoriti i otvoriti nova baza podataka tog imena. Ukoliko navedena baza već postoji, ona će se pokretanjem koda samo otvoriti. Aktivira se \textit{success} događaj te ispisuju informacije o bazi.

\subsubsection{Kreiranje spremišta objekata}
\paragraph{}
IndexedDB je verzionirana. To znači da, želimo li kreirati novo spremište objekata ili samo modificirati postojeće, moramo započeti komunikaciju sa bazom podataka koristeći novu verziju.
Dodamo li gore spomenutom kodu sljedeće izmjene, kreirat ćemo spremište objekata pod nazivom \textit{članovi}. Također, zadali smo da je \textit{prezime} ključ svakog objekta u tom spremištu.

\begin{minted}{js}
var request = window.indexedDB.open("new-db", 2);
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  db.createObjectStore("clanovi", {keyPath: "prezime"});
};
\end{minted}

Kada preglednik uoči da da je broj verzije veći nego kod kreiranja baze podataka, on aktivira \textit{upgrade needed} događaj te na taj način modificira postojeću bazu podataka.

\subsubsection{Dodavanje podataka u spremište objekata}
\paragraph{}
Da bismo dodali podatke u spremište objekata, moramo pokrenuti transakciju. To se postiže pozivanjem \textit{transaction} funkcije na objektu koji predstavlja bazu podataka. Naravno, prije toga je potrebno otvoriti željenu bazu. Transakcije u IndexedDB mogu biti \textit{readwrite} ili \textit{readonly} te stoga funkcija \textit{transaction} prima dva parametra. Prvi je ime spremišta u kojeg želimo dodati elemente, a drugi je neobavezan i označava da li je transakcija \textit{readonly} (zadano) ili \textit{readwrite}.

\begin{minted}{js}
var request = window.indexedDB.open("new-db", 2);
request.onsuccess = function(event) {
  var db = event.target.result;
  var podaci = [
    {"prezime": "Horvat", "ime": "Karlo", "id": "0123"},
    {"prezime": "Anic", "ime": "Ana", "id": "4567"}
  ];
  var transakcija = db.transaction("clanovi", "readwrite");
  transakcija.onerror = function(event) {
    console.log("Error: " + event.target.error);
  };
  var spremiste = transakcija.objectStore("clanovi");
  for(var i = 0; i < podaci.length; i++)
    spremiste.add(podaci[i]);
};
\end{minted}

\subsubsection{Dohvaćanje podataka iz baze podataka}
\paragraph{}
Podatke iz baze možemo dohvatiti na tri načina: korištenjem pokazivača (engl. cursor), korištenjem ključa objekta te korištenjem indeksa. U nastavku slijedi demonstriracija sva tri načina.
\vspace{5mm}
\begin{itemize}
\item\textbf{Dohvaćanje objekata pomoću ključa}.
Prilikom kreiranja spremišta \textit{članovi}, kreiran je ključ \textit{prezime}. To znači da svaki objekt možemo dohvatiti pomoću tog ključa.

\begin{minted}{js}
var request = window.indexedDB.open("new-db", 2);
request.onsuccess = function(event) {
  db = event.target.result;
  var transakcija = db.transaction("clanovi", "readonly");
  var spremiste = transakcija.objectStore("clanovi");
  var req = spremiste.get("Horvat");
  req.onsuccess = function(event) {
    var clan = event.target.result;
    console.log("Ime trazenog clana je " + req.ime);
    //ispis: "Ime trazenog clana je Karlo"
  };
};
\end{minted}

Pokrenemo li gornji kod, nakon otvaranja baze podataka, pokreće se transakcija na spremištu \textit{članovi}. Ovog puta funkciji \textit{transaction} kao drugi parametar proslijeđujemo \textit{readonly} jer ne namjeravamo raditi pohranu u spremište objekata. Iz našeg spremišta članovi ćemo pomoću funkcije \textit{get} dohvatiti objekt čiji ključ je prezime \textit{Horvat}. Kako \textit{get} ima asinkrono djelovanje, ono ne vraća odmah rezultat, već vraća objekt koji predstavlja naš zahtjev. Osluškivanjem \textit{onsuccess} događaja za ovaj zahtjev, čekamo objekt koji smo zatražili.  Član \textit{Karlo Horvat} se nalazi u spremištu pa će se kao ime traženog člana ispisati \textit{Karlo}.
\item\textbf{Dohvaćanje objekata pomoću pokazivača}. Dohvaćanjem objekata pomoću ključa možemo dohvatiti najviše jedan objekt i moramo mu znati točan ključ. Zaključujemo da ta metoda nije uvijek najbolja. Dohvaćanje više objekata odjednom možemo postići korištenjem pokazivača.

\begin{minted}{js}
var request = window.indexedDB.open("new-db", 2);
request.onsuccess = function(event) {
  db = event.target.result;
  var transakcija = db.transaction("clanovi", "readonly");
  var spremiste = transakcija.objectStore("clanovi");
  var kursor = spremiste.openCursor();
  kursor.onsuccess = function(event) {
    var k = event.target.result;
    if(!k) { return; }
    console.log("Ime trazenog clana je " + k.value.ime);
    //ispis u 1.prolazu: "Ime trazenog clana je Karlo"
    //ispis u 2.prolazu: "Ime trazenog clana je Ana"
    k.continue();
  };
};
\end{minted}

Kao i u kodovima do sada, prvo moramo otvoriti bazu podataka i pokrenuti transakciju nad željenim spremištem. Nakon toga otvaramo pokazivač, asinkronu funkciju koja pokreće događaj \textit{onsuccess} svaki puta kada se pokazivač pomakne (pomoću funkcije \textit{continue}). Unutar \textit{onsuccess} funkcije možemo pristupiti pokazivaču kako bismo dohvatili objekt na kojeg pokazivač trenutno pokazuje. U konzolu ispisujemo vrijednost pokazivača koja nas zanima i pomičemo se na idući objekt pozivajući funkciju \textit{conutine} na pokazivaču.

Kao što je već spomenuto, prilikom svakog pomicanja pokazivača, pokreće se \textit{onsuccess} događaj. To znači da će se nakon \textbf{svakog} pomicanja pokazivača, pa čak i onda kada pokazivač pokazuje na zadnji zapis ili čak i onda kada je spremište prazno, pokrenuti \textit{onsuccess} događaj. Zbog toga je, prije pristupa nekoj vrijednosti, važno uvijek provjeriti pokazuje li zaista pokazivač na nešto.

\item\textbf{Dohvaćanje objekata pomoću indeksa}. U dohvaćanju objekata pomoću pokazivača smo vidjeli kako iterirati po svim objetkima i dohvaćati željene vrijednosti. No, kada želimo dohvatiti samo objekte koji zadovoljavaju neki uvjet (primjerice, sve objekte koji su rođeni 1994.), tada moramo koristiti indekse.
Napravimo sada novu bazu podataka i novo spremište objekata pod imenom \textit{osobni\_podaci} te spremimo u njega nekoliko objekata, ali tako da više njih ima godinu rođenja jednaku 1994.

\begin{minted}{js}
var request = window.indexedDB.open("db", 1);
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var spremiste = db.createObjectStore("osobni_podaci", {autoIncrement: true});
  spremiste.createIndex("godina_rodenja", "godina_rodenja", {unique: false});
};
request.onsuccess = function(event) {
  var db = event.target.result;
  var podaci = [
    {"godina_rodenja": "1994", "ime": "Maja"},
    {"godina_rodenja": "1995", "ime": "Hana"},
    {"godina_rodenja": "1994", "ime": "Marko"},
    {"godina_rodenja": "1994", "ime": "Ivan"}
  ];
  var transakcija = db.transaction("[osobni_podaci]", "readwrite");
  transakcija.onerror = function(event) {
    console.log("Error: " + event.target.error);
  };
  var op = transakcija.objectStore("osobni_podaci");
  for(var i = 0; i < podaci.length; i++)
    op.add(podaci[i]);
};
\end{minted}


U prethodnom kodu možemo uočiti vrlo malo razliku u sintaksi koja je namjerno napravljena kako bi se demonstriralo zapisivanje željenog na dva načina.

Spremište \textit{osobni\_podaci} kreirali smo sa auto-inkrementirajućim ključem. Za razliku od spremišta \textit{članovi}, gdje je \textit{prezime} bio jedinstven ključ (što baš i nije najsretnije rješenje jer postoji više ljudi istog prezimena, no ovdje smo generirali primjer gdje to izbjegavamo), ovdje se jedinstveni ključ za svaki objekt generira automatski. Točnije, prvi objekt će imati identifikacijski broj 1, drugi 2 i tako dalje.

Funkcija \textit{createIndex} primi ime indeksa kao svoj prvi argument, put do ključa koji bi indeks trebao koristiti kao drugi te kao treći argument primi polje koje je neobavezno. To polje govori da ključevi koje indeks koristi nisu jednistveni, točnije, da više objekata može imati isti ključ. Ostaka koda nam je poznat.

\begin{minted}{js}
var request = window.indexedDB.open("db", 1);
request.onsuccess = function(event) {
  var db = event.target.result;
  var spremiste = db.transaction("osobni_podaci", "readonly").objectStore("osobni_podaci");
  var indeks = spremiste.index("godina_rodenja");
  var k = indeks.openCursor("1994");
  k.onsuccess = function(event) {
    var kursor = event.target.result;
    if(!kursor) { return; }
    console.log("Ime osobe rodene 1994.godine je " + kursor.value.ime);
    //ispis u 1.prolazu: "Ime osobe rodene 1994.godine je Maja"
    //ispis u 2.prolazu: "Ime osobe rodene 1994.godine je Marko"
    //ispis u 3.prolazu: "Ime osobe rodene 1994.godine je Ivan"
    kursor.continue();
  };
};
\end{minted}

Umjesto da svaku funkciju pišemo zajedno kao samostalnu, ovdje vidimo mogućnost vezanja funkcija jednu na drugu. Također, prikazan je način na koji se može ostvariti ranije spomenuta funkcionalnost.
\end{itemize}

\subsubsection{Ažuriranje objekata u spremištu objekata}
\paragraph{}
Ako nam je poznat primarni ključ objekta, lako ga možemo ažurirati korištenjem funkcije \textit{put}. Funkcija se poziva na spremištu objekta i proslijeđuje mu ažuriranu vrijednost objetka zajedno sa primarnim ključem (kako bi se znalo koji objekt se ažurira). U sljedećem kodu je vidljivo kako se implementira opisani postupak.

\begin{minted}{js}
var request = window.indexedDB.open("db", 1);
request.onsuccess = function(event) {
  var db = event.target.result;
  var spremiste = db.transaction("osobni_podaci", "readonly").objectStore("osobni_podaci");
  var novo = {"godina_rodenja": "1994", "ime": "Maja Lena"};
  var req = spremiste.put(novo, 1);
  req.onsuccess = function() {
    console.log("Ažurirao objekt za koji vrijedi id = 1");
  }:
};
\end{minted}

Spomenuta funkcija \textit{put} može imati i samo jedan parametar. Naime, dva parametra su potrebna samo u slučaju kada spremište ima definiran auto-inkrementirajući ključ. Ukoliko spremište nema auto-inkrementirajući ključ, tada koristimo \textit{put(object)} poziv funkcije. Ako ključ objekta \textit{object} postoji u bazi podataka, taj objekt će se samo ažurirati, no, ako ključ ne postoji u bazi podataka, u bazu će se dodati objekt \textit{object} sa tim ključem. Stoga, kada smo u situaciji da u IndexedDB moramo dodavati objekte, no postoji mogućnost da su oni već spremljeni u istu,  najelegantnije je koristiti funkciju \textit{put} (a ne \textit{add}). U tom slučaju izbjegavamo bespotrebne provjere prisutnosti objekta u bazi.
\subsubsection{Brisanje objekata iz spremišta objekata}
\paragraph{}
Kod brisanja imamo dvije mogućnosti: možemo obrisati sve objekte iz spremišta ili možemo obrisati samo neke objekte. U prvom slučaju koristimo se funkcijom \textit{delete}, a u drugom funkcijom \textit{clear}.

\begin{minted}{js}
var request = window.indexedDB.open("db", 1);
request.onsuccess = function(event) {
  var db = event.target.result;
  db.transaction("osobni_podaci", "readwrite")
    .objectStore("osobni_podaci").delete(1);
};
\end{minted}

Ako nam je poznat ključ objekta koje želimo obrisati, to možemo napraviti na način koji je prikazan na prethodnoj slici. Dakle, obrisali smo objekt koji ima ključ 1.

U svim ostalim slučajevima, primjerice, kada želimo obrisati više objekata odjednom, koristimo se pokazivačem i iteracijom istog po objektima iz spremišta. Naravno, potrebno je zadati neku vrijednost po kojoj se određuje hoće li se objekt obrisati iz baze ili neće. U narednom primjeru brisat ćemo sve osobe koje su rođene 1994.godine.

\begin{minted}{js}
var request = window.indexedDB.open("db", 1);
request.onsuccess = function(event) {
  var db = event.target.result;
  var kursor = db.transaction("osobni_podaci", "readwrite")
                  .objectStore("osobni_podaci").openCursor();
  kursor.onsuccess = function(event) {
    var k = event.target.result;
    if(!k) { return; }
    if(k.value.godina_rodenja === "1994")
      k.delete();
    k.continue();
  };
};
\end{minted}

Želimo li obrisati sve objekte iz nekog spremišta, funkcijom \textit{clear} ćemo dobiti povratnu vrijednost sa \textit{onsuccess} i \textit{onerror} događajima.

\begin{minted}{js}
var request = window.indexedDB.open("db", 1);
request.onsuccess = function(event) {
  var db = event.target.result;
  var brisanje = db.transaction("osobni_podaci", "readwrite")
                  .objectStore("osobni_podaci").clear();
  brisanje.onsuccess = function(event) {
    console.log("Uspjesno brisanje svih objekata!");
  };
};
\end{minted}

\subsection{Lokalna baza podataka za našu aplikaciju}
\paragraph{}
Do sada smo promotrili sve akcije koji će nam trebati za kreiranje i manipulaciju lokalnom bazom podataka za našu aplikaciju i možemo krenuti sa radom. Kreirajmo \textit{indexedDB.html} datoteku. U njoj će se nalaziti kod pomoću kojeg ćemo kreirati i dodati osnovne stvari u bazu. Kao što je bio slučaj sa \textit{prepareDB.php}, prije korištenja same aplikacije, pokrenut ćemo navedenu skriptu kako bi se u pregledniku stvorila naša baza. Zbog toga štu su svi kodovi do sada detaljno objašnjeni te je jasno koji se koristi u kojoj situaciji, detaljno ću navesti samo važne informacije o bazi. Dakle, pripadne kodove izostavljam jer su analogni već viđenima.

Kreiramo bazu pod nazivom \textit{Studenti} (verzija je, naravno, prva). U bazi stvaramo spremište objekata pod nazivom \textit{rezultati} te kao ključ stavljamo \textit{id}. Definiramo indeks \textit{id\_studenta} za ovo spremište. Put do ključa koji indeks treba koristiti je, također, \textit{id\_studenta} te ključ koji indeks koristi nije jedinstven.

Još jedno spremište objekata koje stvaramo ima naziv \textit{kolegiji}. Kao ključ se koristi \textit{id\_kolegija}, a indeks je, također, \textit{id\_kolegija}. Put do ključa koji indeks treba korisiti je \textit{id\_kolegija} te je on jedinstven. U spremište \textit{kolegiji} dodajemo popis svih kolegija. Dakle, jedan objekt u spremištu objekata \textit{kolegiji} je upravo jedan redak tablice kolegiji koja se nalazi u bazi podataka \textit{Studenti} na \textit{phpMyAdmin-u}.

\begin{minted}{js}
{id_kolegija: 1, naziv: "Matematicka analiza 1"}
\end{minted}

Treće spremište koje kreiramo naziva se \textit{bodovi}, ključ je \textit{id\_studenta}, a indeks jest \textit{id\_kolegija}. Put do ključa kojeg indeks koristi je \textit{id\_kolegija} i taj ključ nije jedinstven (jer više objekata može imati isti \textit{id\_kolegija}).

Za početak, primjetimo da na početku skripti \textit{rezultati.html}, \textit{administrator.html}, \textit{upisRez.html} postoji sljedeći kod:

\begin{minted}{js}
if(navigator.onLine) {
  $(/*id elementa gdje se upisuje*/).html("(online)")
                                    .css("color", "#5cb85c");
}
else {
  $(/*id elementa gdje se upisuje*/).html("(offline)")
                                    .css("color", "red");
  $("span").css("color", "red");
  $("h2").css("color", "red");
}

$(window).on("online", function() {
  $(/*id elementa gdje se upisuje*/).html("(online)")
                                    .css("color", "#5cb85c");
  $("span").css("color", "#5cb85c");
  $("h2").css("color", "#5cb85c");
  //console.log("online event triggered: navigator.onLine=" + navigator.onLine);
});

$(window).on("offline", function() {
  $(/*id elementa gdje se upisuje*/).html("(offline)")
                                    .css("color", "red");
  $("span").css("color", "red");
  $("h2").css("color", "red");
  //console.log("offline event triggered: navigator.onLine=" + navigator.onLine);
});
\end{minted}

Pomoću njega smo osigurali da u aplikaciji, uz ime i prezime studenta ili oznake za administratora (ovisno o tome tko se prijavio u aplikaciju), imamo i indikatore koji nam govore postoji li pristup internetskoj vezi ili ne.

\textit{if} i \textit{else} blokovi pokazuju da li se korisnik uoči prijave nalazio \textit{online} ili \textit{offline}. Međutim, ukoliko se promijeni korisnikov status veze, sve dok se ne osvježi stranica, to neće biti vidljivo. Upravo zbog toga postoje reakcije na događaje \textit{online} i \textit{offline}. Na taj način je moguće u svakom trenutku prepoznati promjenu stanja veze i, sukladno sa time, promijeniti indikatore.

Sada je puno lakše uočiti da se sadržaj koji aplikacija pruža korisnicima koji su \textit{online} ne razlikuje od sadržaja koji se pruža korisnicima koji su \textit{offline}.

Sljedeći korak koji moramo napraviti jest taj da osiguramo prikaz rezultata studentima čak i onda kada su oni \textit{offline}. U spremište \textit{rezultati} je potrebno pohraniti sve rezultate studenata koji se prijave u aplikaciju. Dakle, jednom kada student otvori aplikaciju, njegovi rezultati se spremaju u spremište \textit{rezultati}. Ako pri sljedećem otvaranju aplikacije student ne bude imao pristup internetu, učitat će mu se rezultati iz spremišta. Naravno, u tom trenutnu student možda ima i neke nove rezultate, no, da bi i njih vidio, on aplikaciju mora otvoriti u uvjetima u kojima ima pristup internetu. Sljedećim otvaranjem aplikacije koje uspije kontaktirati server (to se događa u slučaju da student ima pristup internetu), podaci u spremištu se ažuriraju. Dakle, koristi se funkcija put koja ili sprema novi objekt u spremište (u slučaju da objekt još ne postoji u spremištu objekata) ili ažurira već postojeći objekt novim rezultatima.

Naredni slučaj u kojem trebamo lokalno pohraniti podatke je unos novih bodova od strane administratora. Zapisivanje bodova u bazu na phpMyAdmin-u će se „riješiti“ pomoću pozadinske sinkronizacije, no o tome nešto kasnije. Za sada ćemo se samo baviti pohranjivanjem potrebnih podataka.

Administratoru želimo omogućiti unos bodova studentima čak i onda kada on nema pristup internetu, no ovdje ima nekoliko komplikacija. Želimo li administratoru dopustiti da on unosi bodove iz svih kolegija, svim studentima, morali bismo lokalno pohraniti čitave baze koje se nalaze na \textit{phpMyAdmin-u}, a to nije efikasno rješenje jer bismo, u tom slučaju, lokalno morali spremati velike količine podataka. Kako bismo pojednostavili ovu situaciju, odlučujemo se na sljedeće: kada je \textit{offline}, administrator može upisati bodove studentima samo za onaj kolegij za koji ih je upisivao zadnji puta kada je imao pristup internetu.

Promotrimo situaciju kada administrator ima pristup internetu. On mora odabrati kolegij za koji želi unesti bodove studentima. Nakon odabira, u Session Storage se spremaju dvije varijabile - identifikacijski broj i naziv odabranog kolegija. Na skripti \textit{upisRez.html} se ti podaci dohvaćaju i, u komunikaciji sa serverom prikazuje se popis svih studenata koji su upisali odabrani kolegij, zajedno sa bodovima koje su ostvarili iz pojedinih elemenata ocjenjivanja. U ovom trenutku imamo pristup podacima koji su nam potrebni: naziv kolegija (točnije, identifikacijski broj kolegija) te popis studenata koji su upisali odabrani kolegij, popraćen njihovim dosadašnjim rezultatima. Sada treba napraviti lokalnu pohranu podataka.

Odgovor servera lokalno spremamo u spremište objekata \textit{bodovi}. Dakle, sada se u spremištu nalaze objekti koji predstavljaju sudente koji su upisali odabrani kolegij. Svaki objekt se sastoji od identifikacijskog broj studenta, naziva kolegija, identifikacijskog broja kolegija te broja dosad ostvarenih bodova. Prije samog spremanja podataka, obrišemo sve objekte koji se već nalaze u spremištu objekata. To su podaci koje smo prošli put spremili u \textit{bodovi.}

Ako administrator posjeti aplikaciju kada je \textit{offline} te želi unesti bodove studentima, on prvo na svojoj početnoj stranici odabire opciju (jedinu opciju koja mu se nudi) \textit{Unos rezultata}. Nakon toga se otvara stranica \textit{upisRez.html} na kojoj se prikaže naziv kolegija za koji je zadnje unosio bodove te popis studenata (sa bodovima) koji su upisali taj kolegij.

Unese li administrator, u ovom trenutku, nove bodove studentima, oni se neće nigdje spremiti jer još nismo omogućili \textit{pozadinsku sinkronizaciju}.

\subsection{Zaključak}
\paragraph{}
Krenuvši od početne aplikacije, do sada smo napravili nekoliko vrlo važnih izmjena. Studenti koji se jednom prijave u aplikaciju te je napuste bez odjave, u mogućnosti su vidjeti svoje rezultate na ispitima čak i onda kada nemaju osiguran pristup internetu. Također, administrator koji napusti aplikaciju bez odjave može vidjeti početnu stranicu koja mu prikazuje popis radnji koje može obavljati te popis svih studenata koji su upisali kolegij za koji je zadnje unosio bodove u bazu podataka (prilikom odabira \textit{Upis rezultata}). U nastavku ćemo osigurati da administrator može unositi nove rezulatate studentima neovisno o mreži. Ostale radnje, dakle unos novih studenata, upisivanje novih kolegija te brisanje upisanih kolegija, administratoru neće biti omogućene ukoliko on nema pristup internetu. Odabir bilo koje od navedenih radnji uzrokovati će prikaz odgovarajuće poruke (o nemogućnosti izvođenja željene radnje) ukoliko internetski pristup nije omogućen.
\section{Pozadinska sinkronizacija}
\section{Push obavijesti}

\end{document}
