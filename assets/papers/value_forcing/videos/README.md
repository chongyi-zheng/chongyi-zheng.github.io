# Benchmark task illustrations

These clips illustrate the benchmark tasks. The OGBench clips and matching
posters were supplied for this project in `assets/papers/value_forcing/ogbench/`
and moved here on 2026-10-25. The OCBench clips are examples provided by the
benchmark authors, not recordings of Value Forcing policies.

## Sources

| Local basename | Supplied filename or original video |
| --- | --- |
| `ogbench-cube-triple` | `ogbench-cube-triple-v0_task5.mp4` and matching `.jpg` |
| `ogbench-cube-quadruple` | `ogbench-cube-quadruple-v0_task3.mp4` and matching `.jpg` |
| `ogbench-puzzle-4x4` | `ogbench-puzzle-4x4-v0_task4.mp4` and matching `.jpg` |
| `ogbench-humanoidmaze-giant` | `ogbench-humanoidmaze-giant-v0_task2.mp4` and matching `.jpg` |
| `ocbench-block-single` | https://seohong.me/projects/ocbench/assets/videos/block-single-task1_3x.mp4 |
| `ocbench-block-double` | https://seohong.me/projects/ocbench/assets/videos/block-double-task2_3x.mp4 |
| `ocbench-chamber-easy` | https://seohong.me/projects/ocbench/assets/videos/chamber-easy-task3_3x.mp4 |

OGBench: Seohong Park, Kevin Frans, Benjamin Eysenbach, and Sergey Levine.
Project: https://seohong.me/projects/ogbench/

OCBench: Seohong Park and Sergey Levine.
Project: https://seohong.me/projects/ocbench/

## Media preparation

The OGBench MP4s and JPEGs are used as supplied, with only their filenames
changed. The videos already have fast-start metadata for progressive playback.
They use H.264 video, `yuv420p`, and 60 fps, without audio.

The OCBench clips were downloaded on 2026-10-25 and remuxed without re-encoding,
with fast-start metadata. Their JPEGs are the first frames of the matching clips.
They show the full environments at the source's 3× playback speed; the paper
evaluates their lite variants.

All clips and posters are 512 × 512 pixels.
